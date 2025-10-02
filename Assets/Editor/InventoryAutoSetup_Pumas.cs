#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace Pumas.EditorTools
{
    /// <summary>
    /// Editor utility that auto-generates a basic inventory system and injects it into the active scene.
    /// </summary>
    public static class InventoryAutoSetup_Pumas
    {
        private const string MenuPath = "Tools/Auto-Setup/Inventory (Pumas)";

        private const string InventoryScriptsFolder = "Assets/Scripts/Gameplay/Inventory";
        private const string PrefabsFolder = "Assets/Art/PrefabsMadre/Gameplay/Inventory";
        private const string ScriptableObjectsFolder = "Assets/Art/ScriptableObjects/Items";
        private const string SpritesFolder = "Assets/Art/Sprites/UI/Inventory";

        private const string PlaceholderIconPath = SpritesFolder + "/placeholder_icon.png";
        private const string SlotPrefabPath = PrefabsFolder + "/InventorySlotUI.prefab";
        private const string CanvasPrefabPath = PrefabsFolder + "/InventoryCanvas.prefab";
        private const string PickupCoinPrefabPath = PrefabsFolder + "/Pickup_Coin.prefab";

        private const string ItemDefinitionScript = InventoryScriptsFolder + "/ItemDefinition.cs";
        private const string InventoryScript = InventoryScriptsFolder + "/Inventory.cs";
        private const string PickupScript = InventoryScriptsFolder + "/PickupItem.cs";
        private const string SlotUIScript = InventoryScriptsFolder + "/InventorySlotUI.cs";
        private const string InventoryUIScript = InventoryScriptsFolder + "/InventoryUI.cs";
        private const string ItemDatabaseScript = InventoryScriptsFolder + "/ItemDatabase.cs";

        [MenuItem(MenuPath)]
        public static void Run()
        {
            EnsureFolders();

            bool wroteScripts = false;
            wroteScripts |= WriteFileIfMissing(ItemDefinitionScript, GetItemDefinitionSource());
            wroteScripts |= WriteFileIfMissing(InventoryScript, GetInventorySource());
            wroteScripts |= WriteFileIfMissing(PickupScript, GetPickupSource());
            wroteScripts |= WriteFileIfMissing(SlotUIScript, GetInventorySlotUISource());
            wroteScripts |= WriteFileIfMissing(InventoryUIScript, GetInventoryUISource());
            wroteScripts |= WriteFileIfMissing(ItemDatabaseScript, GetItemDatabaseSource());

            if (wroteScripts)
            {
                Debug.Log("Inventory auto-setup: scripts created. Waiting for compilation, please run the setup again afterwards.");
                AssetDatabase.Refresh();
                return;
            }

            var placeholderSprite = CreatePlaceholderSprite();
            var items = CreateSampleItems(placeholderSprite);
            var slotPrefab = CreateSlotPrefab();
            var canvasPrefab = CreateCanvasWithGrid(slotPrefab);
            var pickupPrefab = CreatePickupPrefab(items.coin);

            InjectIntoActiveScene(canvasPrefab, pickupPrefab, items);
        }

        #region Folder helpers

        private static void EnsureFolders()
        {
            CreateFolderIfMissing("Assets/Scripts");
            CreateFolderIfMissing("Assets/Scripts/Gameplay");
            CreateFolderIfMissing(InventoryScriptsFolder);

            CreateFolderIfMissing("Assets/Art");
            CreateFolderIfMissing("Assets/Art/PrefabsMadre");
            CreateFolderIfMissing("Assets/Art/PrefabsMadre/Gameplay");
            CreateFolderIfMissing(PrefabsFolder);

            CreateFolderIfMissing("Assets/Art/ScriptableObjects");
            CreateFolderIfMissing(ScriptableObjectsFolder);

            CreateFolderIfMissing("Assets/Art/Sprites");
            CreateFolderIfMissing("Assets/Art/Sprites/UI");
            CreateFolderIfMissing(SpritesFolder);

            CreateFolderIfMissing("Assets/Editor");
        }

        private static void CreateFolderIfMissing(string path)
        {
            if (AssetDatabase.IsValidFolder(path))
            {
                return;
            }

            string parent = Path.GetDirectoryName(path);
            string folderName = Path.GetFileName(path);
            if (string.IsNullOrEmpty(parent))
            {
                return;
            }

            if (!AssetDatabase.IsValidFolder(parent))
            {
                CreateFolderIfMissing(parent.Replace("\\", "/"));
            }

            AssetDatabase.CreateFolder(parent.Replace("\\", "/"), folderName);
        }

        private static bool WriteFileIfMissing(string path, string content)
        {
            if (File.Exists(path))
            {
                return false;
            }

            File.WriteAllText(path, content);
            Debug.Log($"Inventory auto-setup: created script {path}");
            return true;
        }

        #endregion

        #region Script sources

        private static string GetItemDefinitionSource()
        {
            return "using System;\n" +
                   "using UnityEngine;\n\n" +
                   "[CreateAssetMenu(menuName = \"Game/Item Definition\", fileName = \"Item_\")]\n" +
                   "public class ItemDefinition : ScriptableObject\n" +
                   "{\n" +
                   "    [SerializeField] private string itemId = Guid.NewGuid().ToString();\n" +
                   "    public string ItemId => itemId;\n\n" +
                   "    public string displayName;\n" +
                   "    [TextArea] public string description;\n" +
                   "    public Sprite icon;\n" +
                   "    public GameObject worldPrefab;\n\n" +
                   "    public bool stackable = true;\n" +
                   "    [Min(1)] public int maxStack = 99;\n}\n";
        }

        private static string GetInventorySource()
        {
            return "using System;\n" +
                   "using System.Collections.Generic;\n" +
                   "using UnityEngine;\n\n" +
                   "[Serializable]\n" +
                   "public class InventorySlot\n" +
                   "{\n" +
                   "    public ItemDefinition item;\n" +
                   "    public int count;\n\n" +
                   "    public bool IsEmpty => item == null || count <= 0;\n\n" +
                   "    public void Clear()\n" +
                   "    {\n" +
                   "        item = null;\n" +
                   "        count = 0;\n" +
                   "    }\n" +
                   "}\n\n" +
                   "public class Inventory : MonoBehaviour\n" +
                   "{\n" +
                   "    public static Inventory Instance { get; private set; }\n\n" +
                   "    public int capacity = 24;\n" +
                   "    public List<InventorySlot> slots = new List<InventorySlot>();\n\n" +
                   "    public event Action OnInventoryChanged;\n\n" +
                   "    private void Awake()\n" +
                   "    {\n" +
                   "        if (Instance != null && Instance != this)\n" +
                   "        {\n" +
                   "            Debug.LogWarning(\"Multiple Inventory instances detected. Destroying duplicate.\");\n" +
                   "            DestroyImmediate(gameObject);\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        Instance = this;\n" +
                   "        EnsureCapacity();\n" +
                   "    }\n\n" +
                   "    private void EnsureCapacity()\n" +
                   "    {\n" +
                   "        if (slots.Count == capacity)\n" +
                   "        {\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        while (slots.Count < capacity)\n" +
                   "        {\n" +
                   "            slots.Add(new InventorySlot());\n" +
                   "        }\n\n" +
                   "        if (slots.Count > capacity)\n" +
                   "        {\n" +
                   "            slots.RemoveRange(capacity, slots.Count - capacity);\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    public bool Add(ItemDefinition item, int amount = 1)\n" +
                   "    {\n" +
                   "        if (item == null || amount <= 0)\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        EnsureCapacity();\n" +
                   "        int remaining = amount;\n\n" +
                   "        if (item.stackable)\n" +
                   "        {\n" +
                   "            for (int i = 0; i < slots.Count && remaining > 0; i++)\n" +
                   "            {\n" +
                   "                var slot = slots[i];\n" +
                   "                if (slot.item == item && slot.count < item.maxStack)\n" +
                   "                {\n" +
                   "                    int toAdd = Mathf.Min(item.maxStack - slot.count, remaining);\n" +
                   "                    slot.count += toAdd;\n" +
                   "                    remaining -= toAdd;\n" +
                   "                }\n" +
                   "            }\n" +
                   "        }\n\n" +
                   "        for (int i = 0; i < slots.Count && remaining > 0; i++)\n" +
                   "        {\n" +
                   "            var slot = slots[i];\n" +
                   "            if (slot.IsEmpty)\n" +
                   "            {\n" +
                   "                slot.item = item;\n" +
                   "                slot.count = Mathf.Min(item.stackable ? item.maxStack : 1, remaining);\n" +
                   "                remaining -= slot.count;\n" +
                   "            }\n" +
                   "        }\n\n" +
                   "        if (remaining > 0)\n" +
                   "        {\n" +
                   "            Debug.LogWarning(\"Inventory full, could not add all items.\");\n" +
                   "        }\n\n" +
                   "        bool success = remaining < amount;\n" +
                   "        if (success)\n" +
                   "        {\n" +
                   "            OnInventoryChanged?.Invoke();\n" +
                   "        }\n\n" +
                   "        return success;\n" +
                   "    }\n\n" +
                   "    public bool RemoveAt(int slotIndex, int amount = 1)\n" +
                   "    {\n" +
                   "        if (!IsValidSlot(slotIndex) || amount <= 0)\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        var slot = slots[slotIndex];\n" +
                   "        if (slot.IsEmpty)\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        slot.count -= amount;\n" +
                   "        if (slot.count <= 0)\n" +
                   "        {\n" +
                   "            slot.Clear();\n" +
                   "        }\n\n" +
                   "        OnInventoryChanged?.Invoke();\n" +
                   "        return true;\n" +
                   "    }\n\n" +
                   "    public bool UseAt(int slotIndex)\n" +
                   "    {\n" +
                   "        if (!IsValidSlot(slotIndex))\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        var slot = slots[slotIndex];\n" +
                   "        if (slot.IsEmpty)\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        Debug.Log($\"Using item {slot.item.displayName}\");\n" +
                   "        return RemoveAt(slotIndex, 1);\n" +
                   "    }\n\n" +
                   "    public bool DropAt(int slotIndex, Transform dropOrigin = null)\n" +
                   "    {\n" +
                   "        if (!IsValidSlot(slotIndex))\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        var slot = slots[slotIndex];\n" +
                   "        if (slot.IsEmpty)\n" +
                   "        {\n" +
                   "            return false;\n" +
                   "        }\n\n" +
                   "        if (slot.item.worldPrefab != null)\n" +
                   "        {\n" +
                   "            Transform origin = dropOrigin != null ? dropOrigin : transform;\n" +
                   "            Vector3 dropPosition = origin.position + origin.forward;\n" +
                   "            GameObject.Instantiate(slot.item.worldPrefab, dropPosition, Quaternion.identity);\n" +
                   "        }\n\n" +
                   "        return RemoveAt(slotIndex, 1);\n" +
                   "    }\n\n" +
                   "    private bool IsValidSlot(int index)\n" +
                   "    {\n" +
                   "        return index >= 0 && index < slots.Count;\n" +
                   "    }\n" +
                   "}\n";
        }

        private static string GetPickupSource()
        {
            return "using UnityEngine;\n\n" +
                   "[RequireComponent(typeof(Collider))]\n" +
                   "public class PickupItem : MonoBehaviour\n" +
                   "{\n" +
                   "    public ItemDefinition item;\n" +
                   "    public int amount = 1;\n" +
                   "    public KeyCode pickupKey = KeyCode.E;\n\n" +
                   "    private bool playerInRange;\n\n" +
                   "    private void Reset()\n" +
                   "    {\n" +
                   "        var col = GetComponent<Collider>();\n" +
                   "        col.isTrigger = true;\n" +
                   "    }\n\n" +
                   "    private void OnTriggerEnter(Collider other)\n" +
                   "    {\n" +
                   "        if (other.CompareTag(\"Player\"))\n" +
                   "        {\n" +
                   "            playerInRange = true;\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void OnTriggerExit(Collider other)\n" +
                   "    {\n" +
                   "        if (other.CompareTag(\"Player\"))\n" +
                   "        {\n" +
                   "            playerInRange = false;\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void Update()\n" +
                   "    {\n" +
                   "        if (!playerInRange || Inventory.Instance == null)\n" +
                   "        {\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        if (Input.GetKeyDown(pickupKey))\n" +
                   "        {\n" +
                   "            if (Inventory.Instance.Add(item, amount))\n" +
                   "            {\n" +
                   "                Destroy(gameObject);\n" +
                   "            }\n" +
                   "        }\n" +
                   "    }\n" +
                   "}\n";
        }

        private static string GetInventorySlotUISource()
        {
            return "#if TMP_PRESENT\nusing TMPro;\n#endif\nusing System;\nusing UnityEngine;\nusing UnityEngine.EventSystems;\nusing UnityEngine.UI;\n\npublic class InventorySlotUI : MonoBehaviour, IPointerClickHandler\n{\n    [SerializeField] private Image icon;\n    [SerializeField] private GameObject countRoot;\n#if TMP_PRESENT\n    [SerializeField] private TMP_Text countText;\n#else\n    [SerializeField] private Text countText;\n#endif\n    private int slotIndex;\n    private Action<int> onUse;\n    private Action<int> onDrop;\n\n    public void Bind(int index, Sprite sprite, int count, Action<int> onUseCallback, Action<int> onDropCallback)\n    {\n        slotIndex = index;\n        onUse = onUseCallback;\n        onDrop = onDropCallback;\n\n        if (icon != null)\n        {\n            icon.sprite = sprite;\n            icon.enabled = sprite != null;\n            if (sprite == null)\n            {\n                icon.color = new Color(icon.color.r, icon.color.g, icon.color.b, 0f);\n            }\n            else\n            {\n                icon.color = Color.white;\n            }\n        }\n\n        bool showCount = sprite != null && count > 1;\n        if (countRoot != null)\n        {\n            countRoot.SetActive(showCount);\n        }\n\n        if (countText != null)\n        {\n            countText.text = showCount ? count.ToString() : string.Empty;\n        }\n    }\n\n    public void OnPointerClick(PointerEventData eventData)\n    {\n        if (eventData == null)\n        {\n            return;\n        }\n\n        if (eventData.button == PointerEventData.InputButton.Left)\n        {\n            onUse?.Invoke(slotIndex);\n        }\n        else if (eventData.button == PointerEventData.InputButton.Right)\n        {\n            onDrop?.Invoke(slotIndex);\n        }\n    }\n}\n";
        }

        private static string GetInventoryUISource()
        {
            return "using System.Collections.Generic;\n" +
                   "using UnityEngine;\n\n" +
                   "public class InventoryUI : MonoBehaviour\n" +
                   "{\n" +
                   "    [SerializeField] private GameObject rootCanvas;\n" +
                   "    [SerializeField] private Transform gridParent;\n" +
                   "    [SerializeField] private InventorySlotUI slotPrefab;\n" +
                   "    [SerializeField] private KeyCode toggleKey = KeyCode.I;\n\n" +
                   "    private Inventory inventory;\n" +
                   "    private readonly List<InventorySlotUI> spawnedSlots = new List<InventorySlotUI>();\n\n" +
                   "    private void Start()\n" +
                   "    {\n" +
                   "        inventory = Inventory.Instance;\n" +
                   "        if (inventory == null)\n" +
                   "        {\n" +
                   "            Debug.LogError(\"InventoryUI requires an Inventory instance in the scene.\");\n" +
                   "            enabled = false;\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        inventory.OnInventoryChanged += Rebuild;\n" +
                   "        Rebuild();\n\n" +
                   "        if (rootCanvas != null)\n" +
                   "        {\n" +
                   "            rootCanvas.SetActive(false);\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void OnDestroy()\n" +
                   "    {\n" +
                   "        if (inventory != null)\n" +
                   "        {\n" +
                   "            inventory.OnInventoryChanged -= Rebuild;\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void Update()\n" +
                   "    {\n" +
                   "        if (inventory == null)\n" +
                   "        {\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        if (Input.GetKeyDown(toggleKey))\n" +
                   "        {\n" +
                   "            Toggle();\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void Toggle()\n" +
                   "    {\n" +
                   "        if (rootCanvas == null)\n" +
                   "        {\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        bool nextState = !rootCanvas.activeSelf;\n" +
                   "        rootCanvas.SetActive(nextState);\n\n" +
                   "        if (nextState)\n" +
                   "        {\n" +
                   "            Rebuild();\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    public void Rebuild()\n" +
                   "    {\n" +
                   "        if (inventory == null || gridParent == null || slotPrefab == null)\n" +
                   "        {\n" +
                   "            return;\n" +
                   "        }\n\n" +
                   "        for (int i = spawnedSlots.Count - 1; i >= 0; i--)\n" +
                   "        {\n" +
                   "            if (spawnedSlots[i] != null)\n" +
                   "            {\n" +
                   "                Destroy(spawnedSlots[i].gameObject);\n" +
                   "            }\n" +
                   "        }\n" +
                   "        spawnedSlots.Clear();\n\n" +
                   "        for (int i = 0; i < inventory.slots.Count; i++)\n" +
                   "        {\n" +
                   "            var data = inventory.slots[i];\n" +
                   "            var slotUI = Instantiate(slotPrefab, gridParent);\n" +
                   "            spawnedSlots.Add(slotUI);\n\n" +
                   "            Sprite sprite = data.item != null ? data.item.icon : null;\n" +
                   "            int count = data.item != null ? data.count : 0;\n\n" +
                   "            slotUI.Bind(i, sprite, count, OnUseRequest, OnDropRequest);\n" +
                   "        }\n" +
                   "    }\n\n" +
                   "    private void OnUseRequest(int index)\n" +
                   "    {\n" +
                   "        inventory?.UseAt(index);\n" +
                   "    }\n\n" +
                   "    private void OnDropRequest(int index)\n" +
                   "    {\n" +
                   "        Transform origin = inventory != null ? inventory.transform : null;\n" +
                   "        inventory?.DropAt(index, origin);\n" +
                   "    }\n" +
                   "}\n";
        }

        private static string GetItemDatabaseSource()
        {
            return "using System.Linq;\n" +
                   "using UnityEngine;\n\n" +
                   "public class ItemDatabase : MonoBehaviour\n" +
                   "{\n" +
                   "    public ItemDefinition[] allItems;\n\n" +
                   "    public ItemDefinition GetById(string id)\n" +
                   "    {\n" +
                   "        if (string.IsNullOrEmpty(id) || allItems == null)\n" +
                   "        {\n" +
                   "            return null;\n" +
                   "        }\n\n" +
                   "        return allItems.FirstOrDefault(item => item != null && item.ItemId == id);\n" +
                   "    }\n" +
                   "}\n";
        }

        #endregion

        #region Asset creation

        private static Sprite CreatePlaceholderSprite()
        {
            var existing = AssetDatabase.LoadAssetAtPath<Sprite>(PlaceholderIconPath);
            if (existing != null)
            {
                return existing;
            }

            const int size = 64;
            Texture2D texture = new Texture2D(size, size, TextureFormat.RGBA32, false);
            Color32 color = new Color32(200, 200, 200, 255);
            for (int y = 0; y < size; y++)
            {
                for (int x = 0; x < size; x++)
                {
                    texture.SetPixel(x, y, color);
                }
            }
            texture.Apply();

            byte[] pngData = texture.EncodeToPNG();
            UnityEngine.Object.DestroyImmediate(texture);

            File.WriteAllBytes(PlaceholderIconPath, pngData);
            AssetDatabase.ImportAsset(PlaceholderIconPath);

            if (AssetImporter.GetAtPath(PlaceholderIconPath) is TextureImporter importer)
            {
                importer.textureType = TextureImporterType.Sprite;
                importer.mipmapEnabled = false;
                importer.alphaIsTransparency = true;
                importer.SaveAndReimport();
            }

            return AssetDatabase.LoadAssetAtPath<Sprite>(PlaceholderIconPath);
        }

        private static (ItemDefinition coin, ItemDefinition medkit) CreateSampleItems(Sprite placeholder)
        {
            string coinPath = ScriptableObjectsFolder + "/Coin.asset";
            string medkitPath = ScriptableObjectsFolder + "/Medkit.asset";

            ItemDefinition coin = AssetDatabase.LoadAssetAtPath<ItemDefinition>(coinPath);
            if (coin == null)
            {
                coin = ScriptableObject.CreateInstance<ItemDefinition>();
                coin.name = "Coin";
                coin.displayName = "Coin";
                coin.description = "A shiny coin.";
                coin.icon = placeholder;
                coin.stackable = true;
                coin.maxStack = 99;
                AssetDatabase.CreateAsset(coin, coinPath);
            }

            ItemDefinition medkit = AssetDatabase.LoadAssetAtPath<ItemDefinition>(medkitPath);
            if (medkit == null)
            {
                medkit = ScriptableObject.CreateInstance<ItemDefinition>();
                medkit.name = "Medkit";
                medkit.displayName = "Medkit";
                medkit.description = "Restores health.";
                medkit.icon = placeholder;
                medkit.stackable = true;
                medkit.maxStack = 10;
                AssetDatabase.CreateAsset(medkit, medkitPath);
            }

            EditorUtility.SetDirty(coin);
            EditorUtility.SetDirty(medkit);
            AssetDatabase.SaveAssets();

            return (coin, medkit);
        }

        private static InventorySlotUI CreateSlotPrefab()
        {
            var slotPrefab = AssetDatabase.LoadAssetAtPath<InventorySlotUI>(SlotPrefabPath);
            if (slotPrefab != null)
            {
                return slotPrefab;
            }

            GameObject slotRoot = new GameObject("InventorySlotUI", typeof(RectTransform), typeof(CanvasRenderer), typeof(Image), typeof(Button));
            RectTransform rt = slotRoot.GetComponent<RectTransform>();
            rt.sizeDelta = new Vector2(84, 84);
            rt.anchorMin = new Vector2(0.5f, 0.5f);
            rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.pivot = new Vector2(0.5f, 0.5f);

            var bg = slotRoot.GetComponent<Image>();
            bg.color = new Color(1f, 1f, 1f, 0.1f);

            GameObject iconObj = new GameObject("Icon", typeof(RectTransform), typeof(CanvasRenderer), typeof(Image));
            iconObj.transform.SetParent(slotRoot.transform, false);
            RectTransform iconRt = iconObj.GetComponent<RectTransform>();
            iconRt.anchorMin = Vector2.zero;
            iconRt.anchorMax = Vector2.one;
            iconRt.offsetMin = Vector2.zero;
            iconRt.offsetMax = Vector2.zero;
            Image iconImage = iconObj.GetComponent<Image>();
            iconImage.preserveAspect = true;
            iconImage.color = new Color(1f, 1f, 1f, 0f);

            GameObject countRoot = new GameObject("CountRoot", typeof(RectTransform));
            countRoot.transform.SetParent(slotRoot.transform, false);
            RectTransform countRt = countRoot.GetComponent<RectTransform>();
            countRt.anchorMin = new Vector2(1f, 0f);
            countRt.anchorMax = new Vector2(1f, 0f);
            countRt.pivot = new Vector2(1f, 0f);
            countRt.anchoredPosition = new Vector2(-6f, 6f);
            countRt.sizeDelta = new Vector2(40f, 24f);
            countRoot.SetActive(false);

            Component countTextComponent = CreateCountText(countRoot.transform);

            var slotUi = slotRoot.AddComponent<InventorySlotUI>();
            var serializedSlot = new SerializedObject(slotUi);
            serializedSlot.FindProperty("icon").objectReferenceValue = iconImage;
            serializedSlot.FindProperty("countRoot").objectReferenceValue = countRoot;
            serializedSlot.FindProperty("countText").objectReferenceValue = countTextComponent;
            serializedSlot.ApplyModifiedPropertiesWithoutUndo();

            PrefabUtility.SaveAsPrefabAsset(slotRoot, SlotPrefabPath);
            UnityEngine.Object.DestroyImmediate(slotRoot);
            return AssetDatabase.LoadAssetAtPath<InventorySlotUI>(SlotPrefabPath);
        }

        private static Component CreateCountText(Transform parent)
        {
            string[] tmpTypes =
            {
                "TMPro.TextMeshProUGUI, Unity.TextMeshPro",
                "TMPro.TextMeshProUGUI, TMPro"
            };

            foreach (string typeName in tmpTypes)
            {
                Type tmpType = Type.GetType(typeName);
                if (tmpType != null)
                {
                    GameObject tmpObj = new GameObject("Count", typeof(RectTransform));
                    tmpObj.transform.SetParent(parent, false);
                    RectTransform tmpRt = tmpObj.GetComponent<RectTransform>();
                    tmpRt.anchorMin = Vector2.zero;
                    tmpRt.anchorMax = Vector2.one;
                    tmpRt.offsetMin = Vector2.zero;
                    tmpRt.offsetMax = Vector2.zero;
                    var tmpComponent = tmpObj.AddComponent(tmpType);
                    tmpType.GetProperty("text")?.SetValue(tmpComponent, string.Empty);
                    var alignType = tmpType.Assembly.GetType("TMPro.TextAlignmentOptions");
                    if (alignType != null)
                    {
                        var alignmentValue = Enum.Parse(alignType, "BottomRight");
                        tmpType.GetProperty("alignment")?.SetValue(tmpComponent, alignmentValue);
                    }
                    tmpType.GetProperty("fontSize")?.SetValue(tmpComponent, 18f);
                    return tmpComponent;
                }
            }

            GameObject textObj = new GameObject("Count", typeof(RectTransform), typeof(CanvasRenderer), typeof(Text));
            textObj.transform.SetParent(parent, false);
            RectTransform rt = textObj.GetComponent<RectTransform>();
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
            var text = textObj.GetComponent<Text>();
            text.text = string.Empty;
            text.alignment = TextAnchor.LowerRight;
            text.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            text.color = Color.white;
            text.fontSize = 18;
            return text;
        }

        private static GameObject CreateCanvasWithGrid(InventorySlotUI slotPrefab)
        {
            var canvasPrefab = AssetDatabase.LoadAssetAtPath<GameObject>(CanvasPrefabPath);
            if (canvasPrefab != null)
            {
                return canvasPrefab;
            }

            GameObject canvasRoot = new GameObject("InventoryCanvas", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            Canvas canvas = canvasRoot.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;

            CanvasScaler scaler = canvasRoot.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920f, 1080f);

            GameObject panel = new GameObject("Panel", typeof(RectTransform), typeof(CanvasRenderer), typeof(Image));
            panel.transform.SetParent(canvasRoot.transform, false);
            RectTransform panelRt = panel.GetComponent<RectTransform>();
            panelRt.sizeDelta = new Vector2(640f, 420f);
            panelRt.anchorMin = new Vector2(0.5f, 0.5f);
            panelRt.anchorMax = new Vector2(0.5f, 0.5f);
            panelRt.pivot = new Vector2(0.5f, 0.5f);
            panelRt.anchoredPosition = Vector2.zero;
            Image panelImage = panel.GetComponent<Image>();
            panelImage.color = new Color(0f, 0f, 0f, 0.6f);

            GameObject grid = new GameObject("Grid", typeof(RectTransform), typeof(CanvasRenderer), typeof(GridLayoutGroup));
            grid.transform.SetParent(panel.transform, false);
            RectTransform gridRt = grid.GetComponent<RectTransform>();
            gridRt.sizeDelta = new Vector2(600f, 360f);
            gridRt.anchorMin = new Vector2(0.5f, 0.5f);
            gridRt.anchorMax = new Vector2(0.5f, 0.5f);
            gridRt.pivot = new Vector2(0.5f, 0.5f);
            GridLayoutGroup layout = grid.GetComponent<GridLayoutGroup>();
            layout.cellSize = new Vector2(84f, 84f);
            layout.spacing = new Vector2(8f, 8f);
            layout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
            layout.constraintCount = 8;

            var inventoryUi = canvasRoot.AddComponent<InventoryUI>();
            var serializedInventoryUi = new SerializedObject(inventoryUi);
            serializedInventoryUi.FindProperty("rootCanvas").objectReferenceValue = panel;
            serializedInventoryUi.FindProperty("gridParent").objectReferenceValue = grid.transform;
            serializedInventoryUi.FindProperty("slotPrefab").objectReferenceValue = slotPrefab;
            serializedInventoryUi.ApplyModifiedPropertiesWithoutUndo();

            PrefabUtility.SaveAsPrefabAsset(canvasRoot, CanvasPrefabPath);
            UnityEngine.Object.DestroyImmediate(canvasRoot);
            return AssetDatabase.LoadAssetAtPath<GameObject>(CanvasPrefabPath);
        }

        private static GameObject CreatePickupPrefab(ItemDefinition coin)
        {
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(PickupCoinPrefabPath);
            if (prefab != null)
            {
                return prefab;
            }

            GameObject root = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            root.name = "Pickup_Coin";
            UnityEngine.Object.DestroyImmediate(root.GetComponent<Collider>());
            var collider = root.AddComponent<CapsuleCollider>();
            collider.isTrigger = true;
            collider.radius = 0.5f;
            collider.height = 1f;

            var pickup = root.AddComponent<PickupItem>();
            pickup.item = coin;
            pickup.amount = 1;
            pickup.pickupKey = KeyCode.E;

            PrefabUtility.SaveAsPrefabAsset(root, PickupCoinPrefabPath);
            UnityEngine.Object.DestroyImmediate(root);
            return AssetDatabase.LoadAssetAtPath<GameObject>(PickupCoinPrefabPath);
        }

        #endregion

        #region Scene injection

        private static void InjectIntoActiveScene(GameObject canvasPrefab, GameObject pickupPrefab, (ItemDefinition coin, ItemDefinition medkit) items)
        {
            var scene = EditorSceneManager.GetActiveScene();
            if (!scene.IsValid())
            {
                Debug.LogError("Inventory auto-setup: No valid active scene.");
                return;
            }

            bool sceneDirty = false;

            GameObject canvasInstance = GameObject.Find("InventoryCanvas");
            if (canvasInstance == null)
            {
                canvasInstance = (GameObject)PrefabUtility.InstantiatePrefab(canvasPrefab, scene);
                sceneDirty = true;
            }

            GameObject player = FindOrCreatePlayer(scene, ref sceneDirty);
            if (player != null)
            {
                EnsureCharacterController(player, ref sceneDirty);
            }

            EnsureEventSystem(scene, ref sceneDirty);

            GameObject floor = GameObject.Find("Inventory_Floor_Helper");
            if (floor == null)
            {
                floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
                floor.name = "Inventory_Floor_Helper";
                if (player != null)
                {
                    Vector3 pos = player.transform.position;
                    floor.transform.position = new Vector3(pos.x, pos.y - 0.01f, pos.z);
                }
                else
                {
                    floor.transform.position = Vector3.zero;
                }
                sceneDirty = true;
            }

            GameObject manager = GameObject.Find("GameManager");
            if (manager == null)
            {
                manager = new GameObject("GameManager");
                EditorSceneManager.MoveGameObjectToScene(manager, scene);
                sceneDirty = true;
            }

            var inventory = manager.GetComponent<Inventory>();
            if (inventory == null)
            {
                inventory = manager.AddComponent<Inventory>();
                sceneDirty = true;
            }

            var database = manager.GetComponent<ItemDatabase>();
            if (database == null)
            {
                database = manager.AddComponent<ItemDatabase>();
                sceneDirty = true;
            }

            var allItemDefs = AssetDatabase.FindAssets("t:ItemDefinition")
                .Select(AssetDatabase.GUIDToAssetPath)
                .Select(path => AssetDatabase.LoadAssetAtPath<ItemDefinition>(path))
                .Where(def => def != null)
                .Distinct()
                .ToArray();

            if (database.allItems == null || database.allItems.Length != allItemDefs.Length || !database.allItems.SequenceEqual(allItemDefs))
            {
                database.allItems = allItemDefs;
                EditorUtility.SetDirty(database);
                sceneDirty = true;
            }

            EditorUtility.SetDirty(manager);

            if (player != null)
            {
                Vector3 spawnPosition = player.transform.position + player.transform.forward * 2f + Vector3.up * 0.5f;
                bool pickupExists = SceneHasPickupForItem(scene, items.coin);
                if (!pickupExists)
                {
                    GameObject pickupInstance = (GameObject)PrefabUtility.InstantiatePrefab(pickupPrefab, scene);
                    pickupInstance.transform.position = spawnPosition;
                    sceneDirty = true;
                }
            }

            if (sceneDirty)
            {
                EditorSceneManager.MarkSceneDirty(scene);
                Debug.Log("Inventory auto-setup: Scene updated with inventory components.");
            }
            else
            {
                Debug.Log("Inventory auto-setup: Scene already contains required inventory setup.");
            }
        }

        private static GameObject FindOrCreatePlayer(Scene scene, ref bool sceneDirty)
        {
            GameObject player = GameObject.FindWithTag("Player");
            if (player == null)
            {
                player = GameObject.Find("Player");
            }

            if (player == null)
            {
                player = new GameObject("Player");
                player.tag = "Player";
                player.transform.position = Vector3.zero;
                EditorSceneManager.MoveGameObjectToScene(player, scene);
                sceneDirty = true;
            }
            else if (!player.CompareTag("Player"))
            {
                player.tag = "Player";
                sceneDirty = true;
            }

            return player;
        }

        private static void EnsureCharacterController(GameObject player, ref bool sceneDirty)
        {
            if (player.GetComponent<CharacterController>() == null)
            {
                player.AddComponent<CharacterController>();
                sceneDirty = true;
            }
        }

        private static void EnsureEventSystem(Scene scene, ref bool sceneDirty)
        {
            if (UnityEngine.Object.FindObjectOfType<EventSystem>() != null)
            {
                return;
            }

            GameObject eventSystem = new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
            EditorSceneManager.MoveGameObjectToScene(eventSystem, scene);
            sceneDirty = true;
        }

        private static bool SceneHasPickupForItem(Scene scene, ItemDefinition item)
        {
            foreach (var root in scene.GetRootGameObjects())
            {
                var pickups = root.GetComponentsInChildren<PickupItem>(true);
                foreach (var pickup in pickups)
                {
                    if (pickup != null && pickup.item == item)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        #endregion
    }
}
#endif

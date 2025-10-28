let nodeId = 0;

function generateId() {
    return `node-${nodeId++}`;
}

function getNodeType(value) {
    if (Array.isArray(value)) return "array";
    if (typeof value === "object" && value !== null) return "object";
    return "primitive";
}

export function jsonToTree(data, searchPath) {
    nodeId = 0;
    const nodes = [];
    const edges = [];
    const levelWidth = new Map();

    // Normalize search path
    const normalizedSearchPath = searchPath
        ? searchPath.replace(/^\$\.?/, "").replace(/\[(\d+)\]/g, ".$1")
        : "";

    function buildTree(obj, label, path, level, parentId) {
        const id = generateId();
        const type = getNodeType(obj);

        const nodePath = path.replace(/^\$\.?/, "").replace(/\[(\d+)\]/g, ".$1");
        const isHighlighted =
            normalizedSearchPath !== "" && nodePath === normalizedSearchPath;

        const width = levelWidth.get(level) || 0;
        levelWidth.set(level, width + 1);

        const node = {
            id,
            type,
            data: {
                label,
                value: type === "primitive" ? obj : undefined,
                path,
                isHighlighted,
            },
            position: { x: width * 350, y: level * 220 },
        };

        nodes.push(node);

        if (parentId) {
            edges.push({
                id: `${parentId}-${id}`,
                source: parentId,
                target: id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#333", strokeWidth: 2 },
            });
        }

        if (type === "object") {
            Object.entries(obj).forEach(([key, value]) => {
                buildTree(value, key, `${path}.${key}`, level + 1, id);
            });
        } else if (type === "array") {
            obj.forEach((item, index) => {
                buildTree(item, `[${index}]`, `${path}[${index}]`, level + 1, id);
            });
        }

        return id;
    }

    buildTree(data, "root", "$", 0);

    const maxWidth = Math.max(...Array.from(levelWidth.values()));
    nodes.forEach((node) => {
        node.position.x = node.position.x - (maxWidth * 250) / 2 + 125;
    });

    return { nodes, edges };
}

export function searchNodeByPath(data, searchPath) {
    try {
        // Remove $ prefix and normalize path
        const normalizedPath = searchPath
            .replace(/^\$\.?/, "")
            .replace(/\[(\d+)\]/g, ".$1");
        const parts = normalizedPath.split(".").filter(Boolean);

        let current = data;
        let currentPath = "$";

        for (const part of parts) {
            if (current === null || current === undefined) {
                return { found: false, path: "" };
            }

            const arrayMatch = part.match(/^(\d+)$/);
            if (arrayMatch) {
                const index = parseInt(arrayMatch[1]);
                if (Array.isArray(current) && index < current.length) {
                    current = current[index];
                    currentPath += `[${index}]`;
                } else {
                    return { found: false, path: "" };
                }
            } else {
                if (typeof current === "object" && part in current) {
                    current = current[part];
                    currentPath += `.${part}`;
                } else {
                    return { found: false, path: "" };
                }
            }
        }

        return { found: true, path: currentPath };
    } catch (e) {
        return { found: false, path: "" };
    }
}

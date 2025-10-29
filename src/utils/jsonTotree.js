export const generateTree = (data) => {
    const nodes = [];
    const edges = [];
    let nodeId = 0;

    const createNode = (value, key, parentPath, px, py, lvl) => {
        const id = `node-${nodeId++}`;
        const currentPath = parentPath === "root" ? key : `${parentPath}.${key}`;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            nodes.push({
                id,
                type: "object",
                position: { x: px, y: py },
                data: { label: key, path: currentPath, isHighlighted: false },
            });

            const keys = Object.keys(value);
            const spacing = 650;
            keys.forEach((k, i) => {
                const childX = px + (i - keys.length / 2) * spacing;
                const childY = py + 450;
                const childResult = createNode(
                    value[k],
                    k,
                    currentPath,
                    childX,
                    childY,
                    lvl + 1
                );
                edges.push({
                    id: `edge-${id}-${childResult.id}`,
                    source: id,
                    target: childResult.id,
                });
            });
        } else if (Array.isArray(value)) {
            nodes.push({
                id,
                type: "array",
                position: { x: px, y: py },
                data: { label: key, path: currentPath, isHighlighted: false },
            });

            const spacing = 6050;
            value.forEach((item, i) => {
                const childX = px + (i - value.length / 2) * spacing;
                const childY = py + 550;
                const childResult = createNode(
                    item,
                    `[${i}]`,
                    currentPath,
                    childX,
                    childY,
                    lvl + 1
                );
                edges.push({
                    id: `edge-${id}-${childResult.id}`,
                    source: id,
                    target: childResult.id,
                });
            });
        } else {
            nodes.push({
                id,
                type: "primitive",
                position: { x: px, y: py },
                data: {
                    label: key,
                    value: value,
                    path: currentPath,
                    isHighlighted: false,
                },
            });
        }

        return { id, nodes, edges };
    };

    const result = createNode(data, "root", "", 0, 0, 0);
    return { nodes: result.nodes, edges };
};
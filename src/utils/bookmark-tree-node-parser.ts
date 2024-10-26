export function flat(nodes: chrome.bookmarks.BookmarkTreeNode[]): chrome.bookmarks.BookmarkTreeNode[] {
  const flatList: chrome.bookmarks.BookmarkTreeNode[] = [];

  function flatten(nodeList: chrome.bookmarks.BookmarkTreeNode[]) {
    nodeList.forEach((node) => {
      if (node.children && node.children.length > 0) {
        // 자식이 있을 경우
        const hasChildFolder = node.children.some((child) => child.children);

        if (!hasChildFolder) {
          // 자식 폴더가 없는 경우에만 현재 노드를 추가
          flatList.push({
            ...node,
            children: node.children, // 북마크들만 남겨둠
          });
        }

        // 자식 중 폴더가 있을 경우, 그 폴더들만 대상으로 재귀 호출
        flatten(node.children.filter((child) => child.children));
      }
    });
  }

  flatten(nodes);
  return flatList;
}

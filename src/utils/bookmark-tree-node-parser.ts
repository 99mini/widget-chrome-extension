import { partition } from 'es-toolkit';

export function flat(nodes: chrome.bookmarks.BookmarkTreeNode[]): chrome.bookmarks.BookmarkTreeNode[] {
  const flatList: chrome.bookmarks.BookmarkTreeNode[] = [];

  function flatten(nodeList: chrome.bookmarks.BookmarkTreeNode[]) {
    nodeList.forEach((node) => {
      if (Number(node.id) <= 1 && node.children) {
        // id가 0 또는 1인 경우는 반드시 평탄화를 진행하도록 자식 노드 재귀 호출
        flatten(node.children);
      } else if (node.children && node.children.length > 0) {
        // children이 있는 경우: 한 번의 필터링으로 자식들을 분리
        const [folders, bookmarks] = partition(node.children, (child) => Boolean(child.children));

        // 북마크들만 children에 포함하여 flatList에 추가
        flatList.push({
          ...node,
          children: bookmarks,
        });

        // 폴더가 있는 경우 재귀 호출하여 평탄화
        flatten(folders);
      } else {
        // children이 없는 경우: 평탄화 리스트에 바로 추가
        flatList.push(node);
      }
    });
  }

  flatten(nodes);
  return flatList;
}

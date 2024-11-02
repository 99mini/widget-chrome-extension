import { describe, it, expect } from 'vitest';
import { flat } from '@/utils/bookmark-tree-node-parser';

describe('flat', () => {
  it('should flatten bookmark tree to a single level', () => {
    const bookmarks = [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    dateAdded: 1519314589148,
                    dateLastUsed: 1726019925614,
                    id: '6',
                    index: 0,
                    parentId: '5',
                    title: '서울시립대학교',
                    url: 'http://www.uos.ac.kr/main.do',
                  },
                  {
                    dateAdded: 1726032361599,
                    dateLastUsed: 1729951313259,
                    id: '220',
                    index: 1,
                    parentId: '5',
                    title: '대학포털_이루넷_UOS 학생',
                    url: 'https://portal.uos.ac.kr/p/STUD/',
                  },
                ],
                dateAdded: 1602901235555,
                dateGroupModified: 1726032384821,
                id: '5',
                index: 0,
                parentId: '1',
                title: '학교',
              },
              {
                children: [
                  {
                    dateAdded: 1557494513095,
                    dateLastUsed: 1689753911084,
                    id: '22',
                    index: 0,
                    parentId: '21',
                    title: '공모전 대외활동 올콘',
                    url: 'http://all-con.co.kr/',
                  },
                  {
                    dateAdded: 1557494618918,
                    dateLastUsed: 1696667574613,
                    id: '23',
                    index: 1,
                    parentId: '21',
                    title: '대학생 대외활동 - 캠퍼스픽',
                    url: 'https://www.campuspick.com/activity',
                  },
                ],
                dateAdded: 1602901235654,
                dateGroupModified: 1703325864227,
                id: '21',
                index: 1,
                parentId: '1',
                title: '대외활동/공모전',
              },
              {
                dateAdded: 1689044019717,
                dateLastUsed: 1702378211461,
                id: '188',
                index: 6,
                parentId: '1',
                title: 'Next.js 제대로 알기 · Json Media',
                url: 'https://json.media/blog/proper_understading_of_nextjs',
              },
            ],
            dateAdded: 1645084261478,
            dateGroupModified: 1726395927988,
            id: '1',
            index: 0,
            parentId: '0',
            title: '북마크바',
          },
          {
            children: [
              {
                dateAdded: 1606803117226,
                id: '57',
                index: 0,
                parentId: '3',
                title: '구름EDU - 모두를 위한 맞춤형 IT교육',
                url: 'https://edu.goorm.io/',
              },
            ],
            dateAdded: 1645084261478,
            dateGroupModified: 1606803117226,
            id: '3',
            index: 2,
            parentId: '0',
            title: '모바일 북마크',
          },
        ],
        dateAdded: 1729951815082,
        id: '0',
        title: '',
      },
    ];

    const result = flat(bookmarks);

    expect(result).toMatchObject([
      {
        children: [
          {
            dateAdded: 1519314589148,
            dateLastUsed: 1726019925614,
            id: '6',
            index: 0,
            parentId: '5',
            title: '서울시립대학교',
            url: 'http://www.uos.ac.kr/main.do',
          },
          {
            dateAdded: 1726032361599,
            dateLastUsed: 1729951313259,
            id: '220',
            index: 1,
            parentId: '5',
            title: '대학포털_이루넷_UOS 학생',
            url: 'https://portal.uos.ac.kr/p/STUD/',
          },
        ],
        dateAdded: 1602901235555,
        dateGroupModified: 1726032384821,
        id: '5',
        index: 0,
        parentId: '1',
        title: '학교',
      },
      {
        children: [
          {
            dateAdded: 1557494513095,
            dateLastUsed: 1689753911084,
            id: '22',
            index: 0,
            parentId: '21',
            title: '공모전 대외활동 올콘',
            url: 'http://all-con.co.kr/',
          },
          {
            dateAdded: 1557494618918,
            dateLastUsed: 1696667574613,
            id: '23',
            index: 1,
            parentId: '21',
            title: '대학생 대외활동 - 캠퍼스픽',
            url: 'https://www.campuspick.com/activity',
          },
        ],
        dateAdded: 1602901235654,
        dateGroupModified: 1703325864227,
        id: '21',
        index: 1,
        parentId: '1',
        title: '대외활동/공모전',
      },
      {
        dateAdded: 1689044019717,
        dateLastUsed: 1702378211461,
        id: '188',
        index: 6,
        parentId: '1',
        title: 'Next.js 제대로 알기 · Json Media',
        url: 'https://json.media/blog/proper_understading_of_nextjs',
      },
      {
        children: [
          {
            dateAdded: 1606803117226,
            id: '57',
            index: 0,
            parentId: '3',
            title: '구름EDU - 모두를 위한 맞춤형 IT교육',
            url: 'https://edu.goorm.io/',
          },
        ],
        dateAdded: 1645084261478,
        dateGroupModified: 1606803117226,
        id: '3',
        index: 2,
        parentId: '0',
        title: '모바일 북마크',
      },
    ]);
  });
});

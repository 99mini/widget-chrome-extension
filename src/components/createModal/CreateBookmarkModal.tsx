import React, { useCallback, useState } from 'react';

import { TextInput } from '@/components/common/input';
import IconWidget from '@/components/widget/icon/IconWidget';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { urlProtocol, validateUrl } from '@/lib/utils/common';
import { i18n } from '@/lib/utils/string';

import CreateWidgetModal from './_CreateWidgetModal';

const ID = 'bookmark' as const;

type CreateBookmarkModalProps = {
  onClose: () => void;
  initialData?: {
    id: string;
    url?: string;
    title?: string;
    imageUrl?: string;
  };
};

const CreateBookmarkModal: React.FC<CreateBookmarkModalProps> = ({ onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.url ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.imageUrl);

  const {
    actions: { createWidget, updateWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const handleConfirm = useCallback(
    async (url: string, title: string, imageUrl: string | undefined) => {
      await createWidget({
        id: ID,
        title: title,
        widgetType: 'bookmark',
        data: {
          id: ID,
          url: url,
          title: title,
          parentId: '1',
          imageUrl,
        },
      });
    },
    [createWidget]
  );

  const updateBookmark = useCallback(
    async ({ id, url, title, imageUrl }: { id: string; url: string; title: string; imageUrl: string }) => {
      await updateWidget(id, { widgetType: 'bookmark', title, data: { id, url, title, imageUrl } });
    },
    [updateWidget]
  );

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: '바로가기 추가',
        en: 'Add Bookmark',
      })}
      PreviewWidget={
        <IconWidget
          id={ID}
          index={-1}
          title={title}
          url={urlProtocol(url)}
          image={imageUrl ?? `${urlProtocol(url)}/favicon.ico`}
        />
      }
      onConfirm={async () => {
        if (initialData) {
          await updateBookmark({
            id: initialData.id,
            url: url,
            title: title,
            imageUrl: imageUrl ? imageUrl : `${urlProtocol(url)}/favicon.ico`,
          });
        } else {
          await handleConfirm(urlProtocol(url), title, imageUrl);
        }
      }}
      isEdit={Boolean(initialData)}
      requireConfirm={title.length > 0 && validateUrl(url)}
    >
      <TextInput
        label={i18n(region, {
          ko: '위젯 이름',
          en: 'Widget Name',
        })}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextInput
        label={'URL'}
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        valid={validateUrl(url)}
        errorText={i18n(region, {
          ko: '올바른 URL을 입력해주세요.',
          en: 'Please enter a valid URL.',
        })}
      />
      <TextInput
        label={i18n(region, {
          ko: '아이콘 URL',
          en: 'Icon Url',
        })}
        placeholder={i18n(region, {
          ko: '아이콘 URL',
          en: 'Icon Url',
        })}
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </CreateWidgetModal>
  );
};

export default CreateBookmarkModal;

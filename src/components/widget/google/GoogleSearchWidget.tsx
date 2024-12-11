import React from 'react';

import styled from '@emotion/styled';

import { Input } from '@/components/ui/input';
import Widget, { WidgetProps } from '@/components/widget/Widget';

import useThemeStore from '@/hook/useTheme';

const GoogleContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  gap: 8px;

  width: 100%;
  height: 100%;
`;

const AdditionalContainer = styled.div<{
  column?: 2 | 4;
}>`
  display: flex;
  flex-direction: row;

  ${({ column }) => {
    if (column === 2) {
      return `gap: 16px;`;
    }
    if (column === 4) {
      return `gap: 8px;`;
    }
  }}
`;

const GoogleSearchInput = styled(Input)`
  border-radius: 18px;

  background-color: ${({ theme }) => theme.colors.backgroundPalette[200]};

  &:disabled {
    cursor: pointer;
  }
`;

const ID = 'google-search' as const;

type GoogleSearchWidgetProps = {
  index: number;
  disabled?: boolean;
  WidgetProps?: Partial<Omit<WidgetProps, 'id'>>;
};

const GoogleSearchWidget: React.FC<GoogleSearchWidgetProps> = ({ index, disabled, WidgetProps }) => {
  const { region } = useThemeStore();

  const handleSumit = (value: string) => {
    window.location.href = `https://www.google.com/search?q=${value}`;
  };

  return (
    <Widget
      {...WidgetProps}
      index={index}
      id={`${ID}-${WidgetProps?.span?.row}-${WidgetProps?.span?.column}`}
      title={WidgetProps?.title ?? (region === 'ko' ? '구글 검색' : 'Google Search')}
      childrenProps={{
        border: true,
      }}
    >
      <GoogleContainer>
        <GoogleSearchInput
          placeholder={region === 'ko' ? '검색 또는 URL 입력' : 'Search or URL'}
          disabled={disabled}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.key === 'Enter') {
              handleSumit(e.currentTarget.value);
            }
          }}
        />
        {WidgetProps?.span?.row === 2 && (
          <AdditionalContainer column={WidgetProps.span.column}>
            {/* TODO: 아이콘 바로가기 컴포넌트 분리 */}
            <a
              title={region === 'ko' ? '메일' : 'mail'}
              href="https://mail.google.com/"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" />
            </a>
          </AdditionalContainer>
        )}
      </GoogleContainer>
    </Widget>
  );
};

export default GoogleSearchWidget;

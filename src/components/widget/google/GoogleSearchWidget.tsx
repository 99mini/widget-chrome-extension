import React from 'react';

import styled from '@emotion/styled';

import { Input } from '@/components/ui/input';
import Widget, { WidgetProps } from '@/components/widget/Widget';

import useThemeStore from '@/hook/useTheme';

import { i18n } from '@/utils/string';

const GoogleContainer = styled.div<{ multipleLine?: boolean }>`
  display: flex;
  flex-direction: column;

  gap: 8px;

  width: 100%;
  height: 100%;

  ${({ multipleLine }) =>
    multipleLine ? 'justify-content: space-between; padding: 16px 0;' : 'justify-content: center;'}
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

const AdditionalIconLink = styled.a`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdditionalIcon = styled.img``;

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
      title={
        WidgetProps?.title ??
        i18n(region, {
          ko: '구글 검색',
          en: 'Google Search',
        })
      }
      childrenProps={{
        border: true,
      }}
    >
      <GoogleContainer multipleLine={WidgetProps?.span?.row === 2}>
        <GoogleSearchInput
          placeholder={i18n(region, {
            ko: '검색 또는 URL 입력',
            en: 'Search or URL',
          })}
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
            <AdditionalIconLink
              title={i18n(region, {
                ko: '구글',
                en: 'Google',
              })}
              href="https://mail.google.com/"
            >
              <AdditionalIcon src="https://cdn-icons-png.flaticon.com/512/732/732200.png" />
            </AdditionalIconLink>
          </AdditionalContainer>
        )}
      </GoogleContainer>
    </Widget>
  );
};

export default GoogleSearchWidget;

import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { Glassmorphism, ModalBackground, ModalContainerCSS } from './Modal';

import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';
import { getIconPath } from '@/utils/icon';

import { ClockFormatType, SpanType, WidgetType, ClockWidgetType } from '@/types/Widget';
import CreateBookmarkModal from './CreateBookbarkModal';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 24px;

  ${ModalContainerCSS}
`;

const Title = styled.div`
  padding: 8px 0;
  height: 36px;

  box-sizing: border-box;

  text-align: center;

  font-size: 16px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.text};
`;

const WidgetContainer = styled(Glassmorphism)`
  padding: 36px 24px;
  border-radius: 16px;
`;

const WidgetList = styled.div`
  display: grid;
  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};

  grid-template-columns: repeat(auto-fill, 60px);
`;

const ClickableWidget = styled.button<{ isRowSpan?: boolean; isColSpan?: boolean }>`
  grid-row: ${({ isRowSpan }) => (isRowSpan ? 'span 2' : 'span 1')};
  grid-column: ${({ isColSpan }) => (isColSpan ? 'span 2' : 'span 1')};

  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

type CustomWidgetModalProps = {
  onClose: () => void;
};

const CustomWidgetModal: React.FC<CustomWidgetModalProps> = ({ onClose }) => {
  const ref = useClickAway<HTMLDivElement>(onClose, 300);

  const { mode } = useThemeStore();

  const {
    actions: { createWidget },
  } = useWidget();

  const [openBookmarkModal, setOpenBookmarkModal] = useState(false);

  const createClockWidget = useCallback(
    async ({ format, span, title }: { format: ClockFormatType; span: SpanType; title: string }) => {
      const newClockWidget: Omit<WidgetType<ClockWidgetType>, 'index'> = {
        id: `clock-${span.row}-${span.column}`,
        title,
        widgetType: 'clock',
        span,
        data: {
          format,
        },
      };
      createWidget(newClockWidget);
    },
    [createWidget]
  );

  return createPortal(
    <>
      <ModalBackground>
        <ModalContainer>
          <Title>{'위젯 추가'}</Title>
          <WidgetContainer ref={ref}>
            <WidgetList>
              {/* bookmark */}
              <ClickableWidget onClick={() => setOpenBookmarkModal(true)}>
                <IconWidget
                  id={'-1'}
                  title={'바로가기 추가'}
                  image={getIconPath(mode === 'light' ? 'widgets_light_64' : 'widgets_64')}
                  WidgetProps={{
                    dragDisabled: true,
                  }}
                />
              </ClickableWidget>
              {/* bookmark */}
              {/* clock */}
              <ClickableWidget
                isRowSpan
                isColSpan
                onClick={() => {
                  createClockWidget({
                    format: 'a h:mm',
                    span: { row: 1, column: 1 },
                    title: 'clock',
                  });
                }}
              >
                <Clock
                  WidgetProps={{
                    dragDisabled: true,
                  }}
                />
              </ClickableWidget>
              {/* clock */}
            </WidgetList>
          </WidgetContainer>
        </ModalContainer>
      </ModalBackground>
      {openBookmarkModal && <CreateBookmarkModal onClose={() => setOpenBookmarkModal(false)} />}
    </>,
    document.body
  );
};

export default CustomWidgetModal;

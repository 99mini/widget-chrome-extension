import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import { Glassmorphism, ModalBackground, ModalContainerCSS } from '@/components/common/modal/Modal.style';
import { ClockWidget, GoogleSearchWidget, HistoryWidget, IconWidget } from '@/components/widget';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';

import { getIconPath } from '@/utils/icon';
import { i18n } from '@/utils/string';

import CreateBookmarkModal from './CreateBookmarkModal';
import CreateClockModal from './CreateClockModal';
import CreateGoogleModal from './CreateGoogleModal';
import CreateHistoryModal from './CreateHistoryModal';

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

  const { mode, region } = useThemeStore();

  const [openBookmarkModal, setOpenBookmarkModal] = useState(false);
  const [openClockModal, setOpenClockModal] = useState(false);
  const [openGoogleModal, setOpenGoogleModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  return createPortal(
    <>
      <ModalBackground>
        <ModalContainer>
          <Title>
            {i18n(region, {
              ko: '위젯 추가',
              en: 'Add Widget',
            })}
          </Title>
          <WidgetContainer ref={ref}>
            <WidgetList>
              {/* bookmark */}
              <ClickableWidget onClick={() => setOpenBookmarkModal(true)}>
                <IconWidget
                  id={'-1'}
                  title={i18n(region, {
                    ko: '바로가기 추가',
                    en: 'Add Bookmark',
                  })}
                  image={getIconPath(mode === 'light' ? 'widgets_light_64' : 'widgets_64')}
                  WidgetProps={{
                    dragDisabled: true,
                  }}
                />
              </ClickableWidget>
              {/* bookmark */}
              {/* clock */}
              <ClickableWidget onClick={() => setOpenClockModal(true)}>
                <ClockWidget
                  format="HH:mm"
                  WidgetProps={{
                    dragDisabled: true,
                    span: { row: 1, column: 1 },
                  }}
                />
              </ClickableWidget>
              {/* clock */}
              {/* google */}
              <ClickableWidget
                isColSpan
                isRowSpan
                onClick={() => {
                  setOpenGoogleModal(true);
                }}
              >
                <GoogleSearchWidget
                  index={-1}
                  WidgetProps={{
                    title: i18n(region, {
                      ko: '구글',
                      en: 'Google',
                    }),
                    span: { row: 2, column: 2 },
                  }}
                  disabled
                />
              </ClickableWidget>
              {/* google */}
              {/* history */}
              <ClickableWidget
                isColSpan
                isRowSpan
                onClick={() => {
                  setOpenHistoryModal(true);
                }}
              >
                <HistoryWidget
                  index={-1}
                  WidgetProps={{
                    title: i18n(region, {
                      ko: '최근 방문한 사이트',
                      en: 'Recently visited sites',
                    }),
                    span: { row: 2, column: 2 },
                  }}
                  disabled
                />
              </ClickableWidget>
              {/* history */}
            </WidgetList>
          </WidgetContainer>
        </ModalContainer>
      </ModalBackground>
      {openBookmarkModal && <CreateBookmarkModal onClose={() => setOpenBookmarkModal(false)} />}
      {openClockModal && <CreateClockModal onClose={() => setOpenClockModal(false)} />}
      {openGoogleModal && <CreateGoogleModal onClose={() => setOpenGoogleModal(false)} />}
      {openHistoryModal && <CreateHistoryModal onClose={() => setOpenHistoryModal(false)} />}
    </>,
    document.body
  );
};

export default CustomWidgetModal;

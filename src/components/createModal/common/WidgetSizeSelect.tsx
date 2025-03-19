import { SelectProps } from '@radix-ui/react-select';
import React from 'react';

import { DropDownSelect } from '@/components/common/input';

import useThemeStore from '@/hook/useTheme';

import { SPAN_OPTIONS, SpanType } from '@/lib/types/Widget';
import { i18n } from '@/lib/utils/string';

type WidgetSizeSelectProps = {
  placeholder?: string;
  span: SpanType;
  setSpan: (span: SpanType) => void;
  onOpenChange?: SelectProps['onOpenChange'];
  open?: boolean;
  filter?: (span: SpanType) => boolean;
};

const WidgetSizeSelect = ({ placeholder, span, setSpan, onOpenChange, open, filter }: WidgetSizeSelectProps) => {
  const { region } = useThemeStore();
  const options = filter
    ? SPAN_OPTIONS.filter(filter).map((span) => `${span.row}x${span.column}`)
    : SPAN_OPTIONS.map((span) => `${span.row}x${span.column}`);
  return (
    <DropDownSelect
      label={i18n(region, {
        ko: '위젯 크기',
        en: 'Widget Size',
      })}
      placeholder={placeholder}
      onOpenChange={onOpenChange}
      open={open}
      value={`${span.row}x${span.column}`}
      onValueChange={(val) => {
        const [row, column] = val.split('x').map((v) => parseInt(v));
        const selectedSpan = { row, column } as SpanType;
        setSpan(selectedSpan);
      }}
      options={options}
    />
  );
};

export default WidgetSizeSelect;

import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';

export const Select = <ValueType = any>(props: AntSelectProps<ValueType>) => {
  return (
    <AntSelect
      {...props}
      style={{ width: '100%', ...props.style }}
    />
  );
};
import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';

// Просто экспортируем компонент, который принимает пропсы (включая options)
export const Select = <ValueType = any>(props: AntSelectProps<ValueType>) => {
  return (
    <AntSelect
      {...props}
      style={{ width: '100%', ...props.style }}
    />
  );
};
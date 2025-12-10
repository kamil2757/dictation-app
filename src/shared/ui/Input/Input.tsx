import React from 'react';
import { Input as AntInput,type InputProps as AntInputProps } from 'antd';


export interface InputProps extends AntInputProps {}


const CustomInput: React.FC<InputProps> = (props) => {
  return <AntInput {...props} />;
};


type InputComponentType = typeof CustomInput & {
  Password: typeof AntInput.Password;
  TextArea: typeof AntInput.TextArea;
  Search: typeof AntInput.Search;
};

export const Input = CustomInput as InputComponentType;


Input.Password = AntInput.Password;
Input.TextArea = AntInput.TextArea;
Input.Search = AntInput.Search;
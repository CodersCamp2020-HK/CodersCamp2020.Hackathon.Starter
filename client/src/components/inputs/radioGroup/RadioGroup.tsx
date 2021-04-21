import React from 'react';
import { useController, Control, RegisterOptions, Path } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroupMui, {
    RadioGroupProps as RadioGroupPropsMui,
} from '@material-ui/core/RadioGroup';
import SingleRadio, { SingleRadioProps } from '../singleRadio/SingleRadio';

type RadioGroupProps<T extends Record<string, unknown>> = {
    radioOptions: SingleRadioProps[];
    formLabel: string;
    name: Path<T>;
    control: Control<T>;
    rules?: Omit<
        RegisterOptions,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
};

const RadioGroup = <T extends Record<string, any>>({
    radioOptions,
    name,
    control,
    rules,
    formLabel,
    ...inputProps
}: RadioGroupProps<T> & RadioGroupPropsMui) => {
    const {
        field: { ...controledProps },
    } = useController({
        name,
        control,
        rules,
        defaultValue: radioOptions[0].value,
    });

    return (
        <FormControl focused={false} component='fieldset'>
            <FormLabel component='legend'>{formLabel}</FormLabel>
            <RadioGroupMui {...inputProps} {...controledProps}>
                {radioOptions.map(({ label, value }, index) => (
                    <SingleRadio key={index} label={label} value={value} />
                ))}
            </RadioGroupMui>
        </FormControl>
    );
};

export default RadioGroup;

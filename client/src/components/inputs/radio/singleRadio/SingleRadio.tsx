import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio, { RadioProps } from '@material-ui/core/Radio';

export type SingleRadioProps = {
    value: string;
    label: string;
};

const SingleRadio = ({
    value,
    label,
    ...inputProps
}: SingleRadioProps & RadioProps) => {
    return (
        <FormControlLabel
            value={value}
            label={label}
            control={<Radio {...inputProps} />}
        />
    );
};

export default SingleRadio;

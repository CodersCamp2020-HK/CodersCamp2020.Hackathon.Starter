import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export type SingleRadioProps = {
    value: string;
    label: string;
};

const SingleRadio = ({ value, label }: SingleRadioProps) => {
    return <FormControlLabel value={value} label={label} control={<Radio />} />;
};

export default SingleRadio;

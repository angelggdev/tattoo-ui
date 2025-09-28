import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickerValue } from '@mui/x-date-pickers/internals';

export default function DateField(props: {
    onChange: (value: PickerValue) => void,
    value: PickerValue,
    label: string,
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker sx={{ width: '160px !important' }} label={props.label} value={props.value} onChange={props.onChange}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
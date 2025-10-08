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
            <DemoContainer  sx={{ width: '200px !important', paddingTop: 0 }} components={['DatePicker']}>
                <DatePicker label={props.label} value={props.value} onChange={props.onChange}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import "./DeleteModal.scss";

export function DeleteModal(props: {
    open: boolean,
    handleClose: () => void,
    setOpen: (open: boolean) => void
    deleteFn: () => void
}) {

    return (
        <Dialog open={props.open}>
            <DialogTitle className="deleteModal__title" data-testid="delete-modal-title">¿Borrar?</DialogTitle>
            <DialogActions className="deleteModal__actions">
                <Button onClick={props.deleteFn} data-testid="delete-modal-yes-button">Si</Button>
                <Button onClick={props.handleClose} data-testid="delete-modal-no-button">No</Button>
            </DialogActions>
        </Dialog>
    );
}
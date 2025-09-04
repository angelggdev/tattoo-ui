import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import "./DeleteTransactionModal.scss";

export function DeleteTransactionModal(props: {
    transactionIds: string[],
    open: boolean,
    handleClose: () => void,
    setOpen: (open: boolean) => void
    deleteTransaction: (ids) => void
}) {

    return (
        <Dialog open={props.open}>
            <DialogTitle className="deleteTransactionModal__title">Delete Sale?</DialogTitle>
            <DialogActions className="deleteTransactionModal__actions">
                <Button onClick={() => props.deleteTransaction(props.transactionIds)}>Yes</Button>
                <Button onClick={props.handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    );
}
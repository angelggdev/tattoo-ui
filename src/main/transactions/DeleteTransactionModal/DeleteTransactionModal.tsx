import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import "./DeleteTransactionModal.scss";

export function DeleteTransactionModal(props: {
    transactionIds: string[],
    open: boolean,
    handleClose: () => void,
    setOpen: (open: boolean) => void
    deleteTransaction: (ids: string[]) => void
}) {

    return (
        <Dialog open={props.open}>
            <DialogTitle className="deleteTransactionModal__title" data-testid="delete-sale-title">¿Borrar?</DialogTitle>
            <DialogActions className="deleteTransactionModal__actions">
                <Button onClick={() => props.deleteTransaction(props.transactionIds)} data-testid="delete-sale-yes-button">Si</Button>
                <Button onClick={props.handleClose} data-testid="delete-sale-no-button">No</Button>
            </DialogActions>
        </Dialog>
    );
}
import { Collapse, Alert, IconButton, AlertColor } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FAProp {
  open: boolean;
  onClick: () => void;
  severityType: AlertColor;
  msg: string;
}

const FormAlertBox = (props: FAProp) => {
  return (
    <Collapse in={props.open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        variant="outlined"
        severity={props.severityType}
      >
        {props.msg}
      </Alert>
    </Collapse>
  );
};

export default FormAlertBox;

import { Eye, EyeOff } from "lucide-react";
import styles from "./SignUpFields.module.scss";

type SignupFieldsProps = {
  confirm: string;
  setConfirm: React.Dispatch<React.SetStateAction<string>>;
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUpFields({ confirm, setConfirm, showConfirm, setShowConfirm }: SignupFieldsProps) {
  return (
    <div id="confirm-passwd-wrapper" className="relative">
      <label htmlFor="confirm-password"></label>
      <input
        id="confirm-password"
        name="confirm-password"
        placeholder="Confirm Password"
        className={`${styles.textInputPrimary}`}
        type={showConfirm ? "text" : "password"}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        type="button"
        className={styles.eyeBtn}
        onClick={(e) => {
          e.preventDefault();
          setShowConfirm(!showConfirm);
        }}
        aria-label="Toggle confirm password visibility"
      >
        {showConfirm ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};
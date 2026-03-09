import { Eye, EyeOff } from "lucide-react";
import styles from "../AuthForm/AuthForm.module.scss";

type SignupFieldsProps = {
  confirm: string;
  setConfirm: React.Dispatch<React.SetStateAction<string>>;
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUpFields({
  confirm,
  setConfirm,
  showConfirm,
  setShowConfirm,
}: SignupFieldsProps) {
  return (
    <div id="confirm-passwd-wrapper" className={styles.passwdWrapper}>
      <label htmlFor="confirm-password" className="sr-only">
        Confirm Password
      </label>
      <input
        id="confirm-password"
        name="confirm-password"
        placeholder="Confirm Password"
        className={styles.textInputPrimary}
        type={showConfirm ? "text" : "password"}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
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
        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

import IconButton from "../../../components/Common/IconButton";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import styles from "./RateUpdateInfo.module.css";

interface RateUpdateInfoProps {
  elapsed: string;
  onRefresh: () => void;
  loading: boolean;
}

export default function RateUpdateInfo({ elapsed, onRefresh, loading }: RateUpdateInfoProps) {
  return (
    <div className={styles["rateUpdate"]} aria-live="polite">
      <div className={styles["label"]}>{elapsed ? `Updated ${elapsed}` : "Fetching rates..."}</div>
      <IconButton
        icon="⟳"
        ariaLabel="Refresh rates"
        onClick={onRefresh}
        disabled={loading}
      />
      {loading && <LoadingSpinner size="small" />}
    </div>
  );
}

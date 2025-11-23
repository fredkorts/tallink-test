import IconButton from "../../../components/Common/IconButton";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";

interface RateUpdateInfoProps {
  elapsed: string;
  onRefresh: () => void;
  loading: boolean;
}

export default function RateUpdateInfo({ elapsed, onRefresh, loading }: RateUpdateInfoProps) {
  return (
    <div className="rate-update" aria-live="polite">
      <div className="rate-update__label">{elapsed ? `Updated ${elapsed}` : "Fetching rates..."}</div>
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

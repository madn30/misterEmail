export default function ProgressBar({ progress }) {
    const validProgress = Math.round(Math.min(100, Math.max(0, progress)));
    return (
      <div className="progress-bar-container">
        <div
          className="progress-bar-filler"
          style={{ width: `${validProgress}%` }}
        >
          <span className="progress-bar-label">{`${validProgress}%`}</span>
        </div>
      </div>
    );
  }
  
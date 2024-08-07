import Link from "next/link";

const DownloadButtons = () => {
  return (
    <div className="flex flex-col space-y-6 gap-1 mt-4">
      <Link
        href="https://apps.apple.com/us/app/thaid/id1533612248"
        legacyBehavior
      >
        <a target="_blank" rel="noopener noreferrer">
          <img
            src="/appS.png"
            alt="Download on the App Store"
            style={{
              width: "250px",
              height: "auto",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            loading="lazy"
          />
        </a>
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=th.go.dopa.bora.dims.ddopa&hl=th&gl=US&pli=1"
        legacyBehavior
      >
        <a target="_blank" rel="noopener noreferrer">
          <img
            src="/ggPlay.png"
            alt="Get it on Google Play"
            style={{
              width: "250px",
              height: "auto",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            loading="lazy"
          />
        </a>
      </Link>
    </div>
  );
};

export default DownloadButtons;

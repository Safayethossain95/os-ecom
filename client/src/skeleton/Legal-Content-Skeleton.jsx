import Skeleton from "react-loading-skeleton";
const LegalContentSkeleton = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              {Array.from({ length: 8 }).map((item, key) => {
                return <Skeleton key={key} count={16} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalContentSkeleton;

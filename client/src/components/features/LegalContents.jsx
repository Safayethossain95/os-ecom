import LegalContentSkeleton from "../../skeleton/Legal-Content-Skeleton"
import { useFeatureStore } from "../../store/FeatureStore"
import parse from 'html-react-parser';

const LegalContents = () => {
    const {LegalDetails} = useFeatureStore()

    if(LegalDetails===null){
        return <LegalContentSkeleton/>
    }
    else{
        return (
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card p-4">
                    {
                        parse(LegalDetails[0]['description'])
                    }
                  </div>
                </div>
              </div>
            </div>
        )

    }

}

export default LegalContents
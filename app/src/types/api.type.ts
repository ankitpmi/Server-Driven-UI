import { ApiMetaData } from "./common"
import { HomePayloadV1 } from "./v1/home.v1.type"
import { HomePayloadV2 } from "./v2/home.v2.type"

export type HomeApiResponse =
  | {
      metaData: ApiMetaData & { uiVersion: "v1" }
      payload: HomePayloadV1
    }
  | {
      metaData: ApiMetaData & { uiVersion: "v2" }
      payload: HomePayloadV2
    }

// export type HomeApiResponse =
//   | ({
//       metaData: {
//         screen: string
//         uiVersion: "v1"
//       }
//     } & HomePayloadV1)
//   | ({
//       metaData: {
//         screen: string
//         uiVersion: "v2"
//       }
//     } & HomePayloadV2)

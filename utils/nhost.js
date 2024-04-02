import { NhostClient } from "@nhost/nextjs";

export const nhost = new NhostClient({
  subdomain: "hnwrvdhbsjamugnhedcg",
  region: "eu-central-1",
})


export const nhostReq = async ({query, variables}) => {
  if (variables) {
    return await nhost.graphql.request(query, variables).then(res => {
      if (res.error) {
        throw res.error
      }
      return res.data.payload;
    })
  } else {
    return await nhost.graphql.request(query).then(res => {
      if (res.error) {
        throw res.error
      }
      return res.data.payload;
    });
  }
}
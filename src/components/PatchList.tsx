import * as React from "react";
import { View, Text } from "native-base";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_PATCHES_QUERY = gql`
  query GetPatches {
    viewer {
      patches {
        uuid
      }
    }
  }
`;

function PatchList() {
  const { loading, error, data } = useQuery(GET_PATCHES_QUERY);

  if (loading) {
    <View>
      <Text>Loading....</Text>
    </View>;
  }

  if (error) {
    <View>
      <Text>Error: {error}</Text>
    </View>;
  }

  return (
    <View>
      <Text>Patch list.</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

export default PatchList;

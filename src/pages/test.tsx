import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { csvDataFetch } from "@/utils/fetchCSV";

const Test = () => {
  const url =
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_1979_sm_locations.csv";

  const [r, setR] = useState<string | null>(null);

  useEffect(() => {
    csvDataFetch(url).then((res) => {
      setR(JSON.stringify(res, null, "\t"));
      console.log(res);
    });
  }, []);

  return (
    <Box h="100vh">
      <Text h="100%">{r}</Text>
    </Box>
  );
};
export default Test;

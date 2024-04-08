import { splitter } from "@/contracts";
import { useQueryContract } from "@/lib/andrjs";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook for performing a query on a given contract, returns an async query function
 * @param address
 * @returns
 */
export default function useQuerySplitter() {
  const query = useQueryContract(splitter);

  return useQuery({
    queryKey: ["splitter", "get_splitter_config", { query }],
    queryFn: async () => {
      console.log("Query Splitter")
      return await query({
        "get_splitter_config": {},
      });
    },
  });
}

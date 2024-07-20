import {
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  SearchInput,
  Loader,
  PageHeader
} from '../components/common';
import { useGetMaterials } from '../hooks/materials';


export const Materials = () => {
  const { materials, isLoading } = useGetMaterials();

  return (
    <main>
      {
        isLoading
          ?<Loader />
          :<>
            <PageHeader value='Materials' />
            {
              materials.length === 0
                ?<EmptyListPlaceholder listName='material' />
                :<>
                  <SearchInput resourceName='materials' />
                  <ResourcesTable
                    resourceName='material'
                    resources={materials}
                  />
                </>
            }
          </>
      }
    </main>
  );
}

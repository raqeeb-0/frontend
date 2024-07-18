import { Link } from 'react-router-dom';
import {
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  ActionsMenu,
  PageHeader
} from '../components/common';
import { useGetMaterials } from '../hooks/materials';


export const Materials = () => {
  const { materials, isLoading: isFetchingMaterials } = useGetMaterials();

  const isLoading = isFetchingMaterials;

  return (
    <main>
      {
        isLoading
          ?<Loader />
          :<>
            <PageHeader value='Materials' /> 
            <ResourcesTable
              resourceName='material'
              resources={materials}
            />
          </>
      }
    </main>
  );
}

import { Button, MenuProps } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export type DropDownVariants = 'all' | 'active' | 'unactive';

export const useDropDownItems = (
  selectedFilter: DropDownVariants,
  setSelectedFilter: Dispatch<SetStateAction<DropDownVariants>>
) => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('all')}
          type={selectedFilter === 'all' ? 'primary' : 'default'}
        >
          Show all
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('active')}
          type={selectedFilter === 'active' ? 'primary' : 'default'}
        >
          Show active
        </Button>
      ),
      key: '1',
    },
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('unactive')}
          type={selectedFilter === 'unactive' ? 'primary' : 'default'}
        >
          Show unactive
        </Button>
      ),
      key: '2',
    },
  ];

  return items;
};

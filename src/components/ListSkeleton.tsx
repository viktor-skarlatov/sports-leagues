import { List, ListItem, Skeleton } from "@mui/material";

const ITEM_COUNT = 8

export function ListSkeleton() {
  return (
    <List>
      {Array.from({ length: ITEM_COUNT }).map((_, index) => (
        <ListItem key={index} divider>
          <Skeleton variant="text" width="60%" height={32} />
        </ListItem>
      ))}
    </List>
  );
}
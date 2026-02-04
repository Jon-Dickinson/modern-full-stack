import React from 'react';
import styled from 'styled-components';
import type { ItemListModel } from '../lib/uiModel';

type ItemListProps = {
  model: ItemListModel;
};

export default function ItemList({ model }: ItemListProps) {
  return (
    <Container>
      <Header>
        <Title>Items</Title>
        <Meta>
          <MetaText>Total: {model.totalCount}</MetaText>
          <MetaText>Open: {model.openCount}</MetaText>
        </Meta>
      </Header>

      <List>
        {model.rows.map((row) => (
          <Row key={row.id}>
            <Left>
              <RowTitle>{row.title}</RowTitle>
              <RowSubText>{row.createdLabel}</RowSubText>
            </Left>

            <Badge $variant={row.badgeText}>{row.badgeText}</Badge>
          </Row>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  max-width: 820px;
  margin: 40px auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`;

const Meta = styled.div`
  display: flex;
  gap: 16px;
`;

const MetaText = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 14px 16px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RowTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const RowSubText = styled.div`
  font-size: 13px;
  opacity: 0.7;
`;

const Badge = styled.div<{ $variant: 'OPEN' | 'CLOSED' }>`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 8px 10px;
  border-radius: 999px;

  border: 1px solid rgba(0, 0, 0, 0.18);

  ${({ $variant }) =>
    $variant === 'OPEN'
      ? `
    opacity: 0.9;
  `
      : `
    opacity: 0.55;
  `}
`;

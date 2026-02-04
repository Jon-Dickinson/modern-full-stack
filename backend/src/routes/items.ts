import { Router, Request, Response } from 'express';
import prisma from '../prisma.js';

const router = Router();

type ItemStatus = 'open' | 'closed';

type CreateItemBody = {
  title?: unknown;
};

type UpdateItemBody = {
  title?: unknown;
  status?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isItemStatus(value: unknown): value is ItemStatus {
  return value === 'open' || value === 'closed';
}

// GET /items
router.get('/', async (_req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST /items
router.post('/', async (req: Request<{}, {}, CreateItemBody>, res: Response) => {
  try {
    const { title } = req.body;

    if (!isNonEmptyString(title)) {
      res.status(400).json({ error: 'Title is required and must be a non-empty string' });
      return;
    }

    const item = await prisma.item.create({
      data: {
        title: title.trim(),
        status: 'open'
      }
    });

    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT /items/:id
router.put('/:id', async (req: Request<{ id: string }, {}, UpdateItemBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const updateData: { title?: string; status?: ItemStatus } = {};

    if (title !== undefined) {
      if (!isNonEmptyString(title)) {
        res.status(400).json({ error: 'Title must be a non-empty string' });
        return;
      }
      updateData.title = title.trim();
    }

    if (status !== undefined) {
      if (!isItemStatus(status)) {
        res.status(400).json({ error: 'Status must be "open" or "closed"' });
        return;
      }
      updateData.status = status;
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'Provide at least one field to update: title or status' });
      return;
    }

    const item = await prisma.item.update({
      where: { id },
      data: updateData
    });

    res.json(item);
  } catch (error: any) {
    if (error?.code === 'P2025') {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE /items/:id
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.item.delete({ where: { id } });

    res.status(204).send();
  } catch (error: any) {
    if (error?.code === 'P2025') {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// POST /items/:id/close
router.post('/:id/close', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.update({
      where: { id },
      data: { status: 'closed' }
    });

    res.json(item);
  } catch (error: any) {
    if (error?.code === 'P2025') {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to close item' });
  }
});

export default router;

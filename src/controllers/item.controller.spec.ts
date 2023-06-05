import { Test } from '@nestjs/testing';

describe('ItemController', () => {
    let itemController: ItemController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        itemController = moduleRef.get<ItemController>(ItemController);
    });

    it('should be defined', () => {
        expect(itemController).toBeDefined();
    });
});

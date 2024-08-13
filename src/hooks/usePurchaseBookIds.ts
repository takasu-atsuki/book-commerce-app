import { PurchaseBook, User } from '@/app/types/types';

const usePurchaseBookId = async (user: User) => {
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: 'no-store' }
    );
    const purchasesData = await response.json();

    const purchaseBookIds = purchasesData.purchases.map(
      (purchaseBook: PurchaseBook) => purchaseBook.bookId
    );

    return purchaseBookIds;
  }
};

export { usePurchaseBookId };

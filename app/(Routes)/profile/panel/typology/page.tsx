import CatItem from '@/app/(Routes)/(profile)/panel/CatItem';

export default function Home() {
  return (
    <div className="">
      <div className="bg-white shadow-sidebar rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CatItem title="افراد مشهور" icon="memo-circle-check" href="typology/famous_people" />
        <CatItem
          title="شخصیت های تخیلی"
          icon="book-open-reader"
          href="typology/fictional_character"
        />
        <CatItem title="سرگرمی" icon="book-open-reader" href="typology/fun" />
      </div>
    </div>
  );
}

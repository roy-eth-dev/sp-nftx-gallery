import React, { useMemo } from 'react';
import Head from 'next/head';
import useMessage from '@/hooks/useMessage';
import { Fund } from '@/types/fund';
import { Collection } from '@/types/wp';
import Link from 'next/link';
import FundGroup, { Columns } from '@/components/modules/FundGroup';
import Poster, { Colorway } from '@/components/modules/Poster';
import { FormattedMessage } from 'react-intl';
import { getFundKey } from '@/utils/getFundKey';

const HomeContainer = ({
  funds,
  collections,
}: {
  funds: Fund[];
  collections: Collection[];
}) => {
  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-24 pb-18 px-4">
        <h1 className="text-4xl mb-4 font-bold text-center text-gray-50">
          <img
            src="/images/nftx_on_black.svg"
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl"
            alt="NFTX logo"
          />
          <div className="invisible h-0">{useMessage('home.title')}</div>
        </h1>
        <h2 className="text-sm font-bold text-center text-gray-50 leading-loose mb-3">
          {useMessage('home.subtitle', {
            tvl: '🦧',
            volume: '🦧',
          })}
        </h2>
        <p className="text-md object-center text-center text-white text-opacity-50 leading-relaxed max-w-xl mx-auto">
          {useMessage('home.text')}
        </p>

        {!!(collections && collections.length) && (
          <div className="mt-20 mb-16">
            <h3 className="text-gray-50 font-sans font-bold text-2xl mb-8">
              <FormattedMessage id="home.collections.title" />
            </h3>
            <section className="flex flex-wrap -m-2">
              {collections.map((cat) => {
                const vaults = cat.acf.collection_related_fund_vault_ids.split(
                  ','
                );
                // @TODO this all should be powered by CMS
                const url = (() => {
                  // if only one fund exists, go there
                  if (vaults.length === 1) {
                    const vault = funds.find(
                      (f) =>
                        f.vaultId ===
                        Number(cat.acf.collection_related_fund_vault_ids)
                    );

                    if (vault) {
                      return `/funds/${getFundKey(vault)}`;
                    }
                  }

                  return `/collections/${cat.slug}`;
                })();

                return (
                  <Link href={url} key={cat.slug}>
                    <a className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 md:p-2 transition-transform duration-300 transform hover:scale-105">
                      <div className="p-2 md:p-0">
                        <Poster
                          title={cat.acf.collection_title}
                          text={
                            <FormattedMessage
                              id="home.collections.poster.text"
                              values={{
                                count: vaults.length,
                              }}
                            />
                          }
                          image={cat.acf.collection_feature_image}
                          colorway={Colorway.LIGHT}
                        />
                      </div>
                    </a>
                  </Link>
                );
              })}
            </section>
          </div>
        )}

        <div className="mb-24">
          {!!(funds && funds.length) && (
            <FundGroup
              namespace="funds.all"
              slug="/funds"
              funds={funds}
              columns={Columns.FOCUS}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeContainer;

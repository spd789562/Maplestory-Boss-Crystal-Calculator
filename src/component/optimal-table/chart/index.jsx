import dynamic from 'next/dynamic'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { defaultTo, path, not, mergeLeft, includes, pipe } from 'ramda'
import numberFormat from '@utils/number-format'

const Pie = dynamic(() => import('@ant-design/charts/lib/pie'), {
  ssr: false,
})

const OptimalChart = ({ tableData, totalCount, totalMesos, t }) => {
  const config = {
    data: tableData.map(mergeLeft({ split: 1 })),
    angleField: 'split',
    colorField: 'name',
    appendPadding: 10,
    radius: 1,
    innerRadius: 0.6,
    legend: false,
    label: {
      type: 'inner',
      content: '{name}',
      position: 'middle',
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: '#333',
      },
    },
    pieStyle: {
      lineWidth: 0,
      lineDash: [0, 0],
    },
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'unset',
          textOverflow: 'ellipsis',
          fontSize: 18,
        },
        formatter: function formatter(args) {
          return `<div style="display:flex;align-items:center;flex-direction:column;${
            args ? 'transform:translateY(-50%)' : ''
          }">
            <img height="48px" src="${
              args ? `/boss/${args.avatar}` : 'crystal'
            }.png" alt=${args ? args.name : 'crystal'} />
            <div>${args ? args.name : t('total')}</div>
            <div>${t('count')}: ${args ? args.count : totalCount}</div>
            <div>${t('mesos')}: ${numberFormat(
            args ? args.mesos : totalMesos
          )}</div>
          </div>`
        },
      },
    },
    height: 500,
    interactions: [
      {
        type: 'element-single-selected',
        cfg: {
          start: [
            {
              trigger: 'element:touchstart',
              action: 'element-single-selected:toggle',
            },
          ],
        },
      },
      {
        type: 'pie-statistic-active',
        cfg: {
          start: [
            { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
            {
              trigger: 'element:touchstart',
              action: 'pie-statistic:change',
            },
          ],
          end: [
            { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
            {
              trigger: 'element:touchstart',
              action: 'pie-statistic:reset',
              isEnable: pipe(
                path(['event', 'gEvent', 'target', 'cfg', 'element', 'states']),
                defaultTo([]),
                includes('selected'),
                not
              ),
            },
          ],
        },
      },
    ],
  }

  return config.data.length ? <Pie {...config} /> : null
}

OptimalChart.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(OptimalChart)

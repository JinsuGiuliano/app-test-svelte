<script>
    /**
     * Warning:
     * Until the issue [https://github.com/sveltejs/svelte-repl/issues/177] is resolved
     * you should use imports from 'svelte-lightweight-charts@repl' and 'lightweight-charts?module' in REPL
     */
    import {CrosshairMode} from 'lightweight-charts';
    import {Chart, CandlestickSeries} from 'svelte-lightweight-charts';
    import { MarketSymbolPriceData } from '../../stores/WebSocket'
$: data = $MarketSymbolPriceData;
    const options = {
        width: 600,
        height: 300,
        time:{
            timeScale: {
                        secondsVisible:true
                    }
        },
        layout: {
            backgroundColor: '#000000',
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
        },
        crosshair: {
            mode: CrosshairMode.Magnet,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    }

</script>

{#if $MarketSymbolPriceData}
<Chart {...options}>
    <CandlestickSeries
        data={data}
        reactive={true}
        upColor="rgba(255, 144, 0, 1)"
        downColor="#000"
        borderDownColor="rgba(255, 144, 0, 1)"
        borderUpColor="rgba(255, 144, 0, 1)"
       
    />
</Chart>
{/if}

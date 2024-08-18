import React, { useCallback, useRef, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import * as d3Force from 'd3-force';
import * as d3Zoom from 'd3-zoom';

const NetworkGraph = () => {
  const fgRef = useRef();

  const nodeImages = {
    Axelar: 'path_to_axelar_logo.png',
    Ethereum: '../assets/eth-logo.svg',
    'BNB Chain': 'path_to_bnb_chain_logo.png',
    Polygon: '../assets/matic-logo.svg',
    Avalanche: 'path_to_avalanche_logo.png',
    Fantom: 'path_to_fantom_logo.png',
    Terra: 'path_to_terra_logo.png',
    Osmosis: 'path_to_osmosis_logo.png',
    Cosmos: 'path_to_cosmos_logo.png',
    Arbitrum: 'path_to_arbitrum_logo.png',
    Optimism: 'path_to_optimism_logo.png',
    Kava: 'path_to_kava_logo.png',
    Celo: 'path_to_celo_logo.png',
    Moonbeam: 'path_to_moonbeam_logo.png',
    Aurora: 'path_to_aurora_logo.png',
    Injective: 'path_to_injective_logo.png',
    Persistence: 'path_to_persistence_logo.png',
    'e-Money': 'path_to_emoney_logo.png',
    Secret: 'path_to_secret_logo.png',
    Evmos: 'path_to_evmos_logo.png',
    Crescent: 'path_to_crescent_logo.png',
    Juno: 'path_to_juno_logo.png',
    Stride: 'path_to_stride_logo.png',
    Sui: 'path_to_sui_logo.png',
    Aptos: 'path_to_aptos_logo.png',
    Filecoin: 'path_to_filecoin_logo.png',
    Algorand: 'path_to_algorand_logo.png',
    Base: 'path_to_base_logo.png',
    Mantle: 'path_to_mantle_logo.png',
    Linea: 'path_to_linea_logo.png',
    Saga: 'path_to_saga_logo.png',
    Celestia: 'path_to_celestia_logo.png',
    Sei: 'path_to_sei_logo.png',
    Scroll: 'path_to_scroll_logo.png',
    Archway: 'path_to_archway_logo.png',
    Neutron: 'path_to_neutron_logo.png',
    Centrifuge: 'path_to_centrifuge_logo.png',
    Umee: 'path_to_umee_logo.png',
    Agoric: 'path_to_agoric_logo.png',
    Fetch: 'path_to_fetch_logo.png',
    Aura: 'path_to_aura_logo.png',
    Sommelier: 'path_to_sommelier_logo.png',
    'Function X': 'path_to_function_x_logo.png',
    Kujira: 'path_to_kujira_logo.png',
    Stargaze: 'path_to_stargaze_logo.png',
    AssetMantle: 'path_to_assetmantle_logo.png',
    Comdex: 'path_to_comdex_logo.png',
    Ojo: 'path_to_ojo_logo.png',
    Bitsong: 'path_to_bitsong_logo.png',
    Regen: 'path_to_regen_logo.png',
    Chihuahua: 'path_to_chihuahua_logo.png',
    Lava: 'path_to_lava_logo.png',
    Teritori: 'path_to_teritori_logo.png',
    Carbon: 'path_to_carbon_logo.png',
    Haqq: 'path_to_haqq_logo.png',
    'White Whale': 'path_to_white_whale_logo.png',
    Rebus: 'path_to_rebus_logo.png',
    Provenance: 'path_to_provenance_logo.png',
    'Chain4Energy': 'path_to_chain4energy_logo.png',
    Nomic: 'path_to_nomic_logo.png',
    Nolus: 'path_to_nolus_logo.png',
    IXO: 'path_to_ixo_logo.png',
    Dymension: 'path_to_dymension_logo.png',
    Acrechain: 'path_to_acrechain_logo.png',
    XPLA: 'path_to_xpla_logo.png',
    Immutable: 'path_to_immutable_logo.png',
    Blast: 'path_to_blast_logo.png',
    KI: 'path_to_ki_logo.png',
    Fraxtal: 'path_to_fraxtal_logo.png',
  };

  const data = {
    nodes: Object.keys(nodeImages).map(id => ({ id, group: 1 })),
    links: Object.keys(nodeImages)
      .filter(id => id !== 'Axelar')
      .map(id => ({ source: 'Axelar', target: id }))
  };

  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const image = new Image();
    const size = 20;
    image.src = nodeImages[node.id];
    image.onload = () => {
      ctx.drawImage(image, node.x - size / 2, node.y - size / 2, size, size);
    };

    const label = node.id;
    const fontSize = 4;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(label, node.x, node.y + size / 2 + fontSize);
  }, []);

  const handleEngineStop = useCallback(() => {
    fgRef.current.zoomToFit(400);
  }, []);

  useEffect(() => {
    const graph = fgRef.current;

    if (graph) {
      // Use D3 Zoom behavior
      const zoomBehavior = d3Zoom.zoom()
        .scaleExtent([1, 8]) // Adjust zoom scale as needed
        .on('zoom', (event) => {
          graph.zoom(event.transform.k);
          graph.translateTo(event.transform.x, event.transform.y);
        });

      // Attach zoom behavior to the canvas element
      const canvas = graph.renderer().domElement;
      d3Zoom.select(canvas).call(zoomBehavior);
    }
  }, [fgRef]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ForceGraph2D
        width={window.innerWidth}  // This ensures the graph takes up the full width
        height={window.innerHeight}
        ref={fgRef}
        graphData={data}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={() => {}} // Disable pointer area painting
        linkColor={() => 'rgba(255,255,255,0.2)'}
        linkWidth={0.5}
        d3Force={(engine) => {
          engine
            .force('charge', d3Force.forceManyBody().strength(-200))
            .force('center', d3Force.forceCenter())
            .force('link', d3Force.forceLink().id(d => d.id).distance(150));
        }}
        onEngineStop={handleEngineStop}
        onNodeClick={() => {}} // Disable node click functionality
        onLinkClick={() => {}} // Disable link click functionality
        onNodeHover={() => {}} // Disable node hover functionality
        onLinkHover={() => {}} // Disable link hover functionality
      />
    </div>
  );
};

export default NetworkGraph;

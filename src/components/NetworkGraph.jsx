import React, { useCallback, useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import * as d3 from "d3-force";

const NetworkGraph = () => {
  const fgRef = useRef();
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null); // State to track the clicked (selected) node

  const nodeImages = {
    // Define your node images here as before
    Axelar: require("../assets/b.svg").default,
    Ethereum: require("../assets/eth-logo.svg").default,
    "BNB Chain": require("../assets/logo2.svg").default,
    Polygon: require("../assets/matic-logo.svg").default,
    Avalanche: require("../assets/avalanche.svg").default,
    Fantom: require("../assets/fantom.svg").default,
    Terra: "path_to_terra_logo.png",
    Osmosis: "path_to_osmosis_logo.png",
    Cosmos: "path_to_cosmos_logo.png",
    Arbitrum: "path_to_arbitrum_logo.png",
    Optimism: require("../assets/optimism.svg").default,
    Kava: "path_to_kava_logo.png",
    Celo: "path_to_celo_logo.png",
    Moonbeam: "path_to_moonbeam_logo.png",
    Aurora: "path_to_aurora_logo.png",
    Injective: "path_to_injective_logo.png",
    Persistence: "path_to_persistence_logo.png",
    "e-Money": "path_to_emoney_logo.png",
    Secret: "path_to_secret_logo.png",
    Evmos: "path_to_evmos_logo.png",
    Crescent: "path_to_crescent_logo.png",
    Juno: "path_to_juno_logo.png",
    Stride: "path_to_stride_logo.png",
    Sui: "path_to_sui_logo.png",
    Aptos: "path_to_aptos_logo.png",
    Filecoin: "path_to_filecoin_logo.png",
    Algorand: "path_to_algorand_logo.png",
    Base: require("../assets/base-logo.svg").default,
    Mantle: "path_to_mantle_logo.png",
    Linea: "path_to_linea_logo.png",
    Saga: "path_to_saga_logo.png",
    Celestia: "path_to_celestia_logo.png",
    Sei: "path_to_sei_logo.png",
    Scroll: "path_to_scroll_logo.png",
    Archway: "path_to_archway_logo.png",
    Neutron: "path_to_neutron_logo.png",
    Centrifuge: "path_to_centrifuge_logo.png",
    Umee: "path_to_umee_logo.png",
    Agoric: "path_to_agoric_logo.png",
    Fetch: "path_to_fetch_logo.png",
    Aura: "path_to_aura_logo.png",
    Sommelier: "path_to_sommelier_logo.png",
    "Function X": "path_to_function_x_logo.png",
    Kujira: "path_to_kujira_logo.png",
    Stargaze: "path_to_stargaze_logo.png",
    AssetMantle: "path_to_assetmantle_logo.png",
    Comdex: "path_to_comdex_logo.png",
    Ojo: "path_to_ojo_logo.png",
    Bitsong: "path_to_bitsong_logo.png",
    Regen: "path_to_regen_logo.png",
    Chihuahua: "path_to_chihuahua_logo.png",
    Lava: "path_to_lava_logo.png",
    Teritori: "path_to_teritori_logo.png",
    Carbon: "path_to_carbon_logo.png",
    Haqq: "path_to_haqq_logo.png",
    "White Whale": "path_to_white_whale_logo.png",
    Rebus: "path_to_rebus_logo.png",
    Provenance: "path_to_provenance_logo.png",
    Chain4Energy: "path_to_chain4energy_logo.png",
    Nomic: "path_to_nomic_logo.png",
    Nolus: "path_to_nolus_logo.png",
    IXO: "path_to_ixo_logo.png",
    Dymension: "path_to_dymension_logo.png",
    Acrechain: "path_to_acrechain_logo.png",
    XPLA: "path_to_xpla_logo.png",
    Immutable: "path_to_immutable_logo.png",
    Blast: "path_to_blast_logo.png",
    KI: "path_to_ki_logo.png",
    Fraxtal: "path_to_fraxtal_logo.png",
  };

  const data = {
    nodes: Object.keys(nodeImages).map((id) => ({ id, group: 1 })),
    links: Object.keys(nodeImages)
      .filter((id) => id !== "Axelar")
      .map((id) => ({ source: "Axelar", target: id })),
  };

  const nodeCanvasObject = useCallback(
    (node, ctx, globalScale) => {
      const size = 10;

      // Draw the border for the selected node
      if (node === selectedNode) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, size / 2 + 3, 0, 2 * Math.PI, false); // Adjust the radius for the border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw the node image
      const image = new Image();
      image.src = nodeImages[node.id];
      ctx.drawImage(image, node.x - size / 2, node.y - size / 2, size, size);

      // Draw the node label
      const label = node.id;
      const fontSize = 2.5;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(label, node.x, node.y + size / 2 + fontSize);
    },
    [selectedNode, nodeImages]
  );

  const handleNodeClick = (node) => {
    setSelectedNode(node); // Update the selected node state
  };

  const handleEngineStop = useCallback(() => {
    fgRef.current.zoomToFit(400, 50);
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = Object.values(nodeImages).map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setLoading(false); // Set loading to false after all images are loaded
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    loadImages();
  }, [nodeImages]);

  const linkColor = (link) => {
    // Change link color to white if it connects to the selected node
    if (
      selectedNode &&
      (link.source.id === selectedNode.id || link.target.id === selectedNode.id)
    ) {
      return "white";
    }
    return "rgba(255,255,255,0.2)";
  };

  const getRandomColor = () => {
    const colors = [
      "#ff5733",
      "#33ff57",
      "#5733ff",
      "#ff33a5",
      "#33a5ff",
      "#a533ff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="mb-5">
        <h3 className="text-white heading mt-5">Network Graph</h3>
        {loading ? (
          <div className="loader">
            <p>Loading...</p>
          </div>
        ) : (
          <ForceGraph2D
            width={648}
            height={632}
            ref={fgRef}
            graphData={data}
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
              ctx.fill();
            }}
            linkColor={linkColor}
            linkWidth={0.5}
            d3Force={(engine) => {
              engine
                .force("charge", d3.forceManyBody().strength(-200))
                .force("center", d3.forceCenter())
                .force(
                  "link",
                  d3
                    .forceLink()
                    .id((d) => d.id)
                    .distance(100)
                );
            }}
            enableZoomInteraction={false}
            onNodeClick={handleNodeClick}
            onEngineStop={handleEngineStop}
            linkDirectionalParticles={2} // Number of particles on each link
            linkDirectionalParticleSpeed={() => Math.random() * 0.02 + 0.005} // Speed of the particles
            linkDirectionalParticleWidth={0.8} // Width of the particles
            linkDirectionalParticleColor={getRandomColor}
          />
        )}
      </div>
    </div>
  );
};

export default NetworkGraph;

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';

// Definindo a estrutura dos produtos
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  promocao: string;
}

// Dados dos Produtos
const produtos: Produto[] = [
  { id: 1, nome: 'Café do Sítio 500g', categoria: 'Mercearia', preco: 'R$ 16,99', imagem: 'https://www.cafedositio.com.br/wp-content/uploads/2015/10/almofada_sitio_250_500.png', promocao: 'Desconto de 10%' },
  { id: 2, nome: 'Macarrão Emegê parafuso 500g', categoria: 'Mercearia', preco: 'R$ 4,50', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlAxsENE1pG2XDV93g_YlEILoWigb9XlssaA&s', promocao: 'Sem promoção' },
  { id: 3, nome: 'Nescau 500g', categoria: 'Bebidas', preco: 'R$ 7,00', imagem: 'https://down-br.img.susercontent.com/file/23c146cc0bd680bf9b977cb7c20fa0f3', promocao: 'Desconto de 5%' },
  { id: 4, nome: 'Patinho Bovino', categoria: 'Carnes', preco: 'R$ 35,99', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4H50lcezZjUxxI7THy4y3NRpCld_VkSBs2w&s', promocao: 'Desconto de 15%' },
  { id: 5, nome: 'Coxa e Sobrecoxa de Frango Sadia', categoria: 'Aves e Peixes', preco: 'R$ 12,00', imagem: 'https://www.clubeextra.com.br/img/uploads/1/618/27254618.jpg', promocao: 'Compre 1kg, leve 1,5kg' },
  { id: 6, nome: 'Filé de Tilápia Copacol', categoria: 'Aves e Peixes', preco: 'R$ 18,00', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39nZRj6imi8RMWpyr0eI5DZ6o_b6U0Lh4_g&s', promocao: 'Desconto de 20%' },
  { id: 7, nome: 'Margarina Delícia 500 g', categoria: 'Mercearia', preco: 'R$ 5,00', imagem: 'https://mambodelivery.vtexassets.com/arquivos/ids/187132/margarina-cremosa-com-sal-delicia-500g.png?v=638012678434870000', promocao: 'Desconto de 10%' },
  { id: 8, nome: 'Feijão carioca Delicia pct 1kg', categoria: 'Mercearia', preco: 'R$ 8,00', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGrrgWd-XWX0TSNpYz8yQMwkTIy2esHtm1g&s', promocao: 'Desconto de 10%' },
  // Adicionando novos itens de mercearia
  { id: 9, nome: 'Arroz Tio João 5kg', categoria: 'Mercearia', preco: 'R$ 19,90', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUepVEtv2ciz9cX5t9l8hhG2_TW9ie7_mmDQ&s', promocao: 'Sem promoção' },
  { id: 10, nome: 'Óleo de Soja Liza 900ml', categoria: 'Mercearia', preco: 'R$ 5,99', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxGnFurAicP615uVI-6n23FK7Zen4ncOr2A&s', promocao: 'Desconto de 15%' },
  { id: 11, nome: 'Açúcar União 1kg', categoria: 'Mercearia', preco: 'R$ 4,29', imagem: 'https://propao.agilecdn.com.br/1744_1.jpg', promocao: 'Desconto de 5%' },
  { id: 12, nome: 'Farinha de Trigo Dona Benta 1kg', categoria: 'Mercearia', preco: 'R$ 3,50', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7DR1UGZkADKEEannEjV8asymCF5gNst7iZg&s', promocao: 'Sem promoção' },

  // Adicionando novos itens no catálogo de bebidas não alcoólicas
  { id: 13, nome: 'Suco de Laranja Del Valle 1L', categoria: 'Bebidas', preco: 'R$ 4,99', imagem: 'https://static.paodeacucar.com/img/uploads/1/786/24997786.jpg', promocao: 'Desconto de 5%' },
  { id: 14, nome: 'Refrigerante Coca-Cola 2L', categoria: 'Bebidas', preco: 'R$ 8,49', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtaAjMdgGPmzFHqYmRAYUNHXMsnlWrlFVRw&s', promocao: 'Desconto de 10%' },
  { id: 15, nome: 'Leite Integral Parmalat 1L', categoria: 'Bebidas', preco: 'R$ 3,99', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMopvTGqdkA8JVddT0yzv4U-65Ce6ckCE6A&s', promocao: 'Desconto de 8%' },
  { id: 16, nome: 'Chá Preto Lipton 24 Sachês', categoria: 'Bebidas', preco: 'R$ 6,50', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvnoUUgtf3SUHv5okg_ksHqOHlG473a6x-g&s', promocao: 'Sem promoção' },
  { id: 17, nome: 'Água Mineral Crystal 500ml', categoria: 'Bebidas', preco: 'R$ 1,50', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy3r132-q1gBA3i4LItCIjJfsu1ChGGyoU8Q&s', promocao: 'Sem promoção' },
  // Adicionando carnes bovinas
  { id: 18, nome: 'Picanha Bovino 1kg', categoria: 'Carnes', preco: 'R$ 49,90', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbmR_Ih-54xIbSLn9lys3VPFp-Gfyh1BDArw&s', promocao: 'Desconto de 10%' },
  { id: 19, nome: 'Alcatra Bovino 1kg', categoria: 'Carnes', preco: 'R$ 39,90', imagem: 'https://apoioentrega.vteximg.com.br/arquivos/ids/466744/MIOLO-ALCATRA-PORCNDO-KG-RESFD-.jpg?v=637442340544630000', promocao: 'Desconto de 12%' },
  { id: 20, nome: 'Maminhas 1kg', categoria: 'Carnes', preco: 'R$ 35,00', imagem: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/180519/Carne-Bovina-Maminha-FRIBOI-Resfriada-1Kg.jpg?v=637586863745700000', promocao: 'Desconto de 8%' },
  { id: 21, nome: 'Fraldinha Bovino 1kg', categoria: 'Carnes', preco: 'R$ 31,90', imagem: 'https://bigdelivery-assets-sales-production.s3-sa-east-1.amazonaws.com/spree/images/832/large/Fraldinha_%281_de_1%29.jpg?1505901920', promocao: 'Sem promoção' },
  { id: 22, nome: 'Costelas  1kg', categoria: 'Carnes', preco: 'R$ 27,90', imagem: 'https://coopsp.vtexassets.com/arquivos/ids/224901-800-auto?v=637919587939600000&width=800&height=auto&aspect=true', promocao: 'Desconto de 15%' },
    // Categoria: Aves e Peixes
    { id: 2, nome: 'Peito de Frango Desossado Perdigão', categoria: 'Aves e Peixes', preco: 'R$ 15,90', imagem: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/166741/File-de-Peito-de-Frango-Congelado-sem-Pele-sem-Osso-Perdigao-800g.jpg?v=637398452695770000', promocao: 'Desconto de 10%' },
    { id: 3, nome: 'Coxa e Sobrecoxa de Frango Sadia', categoria: 'Aves e Peixes', preco: 'R$ 12,00', imagem: 'https://www.clubeextra.com.br/img/uploads/1/618/27254618.jpg', promocao: 'Compre 1kg, leve 1,5kg' },
    { id: 4, nome: 'Salmão Congelado', categoria: 'Aves e Peixes', preco: 'R$ 45,00', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Bzrz9cG1amOYv_YM3SACdRp_fYBBR4iV7Q&s', promocao: 'Sem promoção' },
    // Categoria: Hortifruti
    { id: 6, nome: 'Tomate Italiano kg', categoria: 'Hortifruti', preco: 'R$ 7,99', imagem: 'https://giassi.vtexassets.com/arquivos/ids/1168093/Tomate-Italiano-Kg.png?v=638510608979900000', promocao: 'Desconto de 15%' },
    { id: 7, nome: 'Batata Doce kg', categoria: 'Hortifruti', preco: 'R$ 3,49', imagem: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/13935/medium/batata-doce-rosada-kg_10659.jpg', promocao: 'Sem promoção' },
    { id: 8, nome: 'Abóbora Japonesa kg', categoria: 'Hortifruti', preco: 'R$ 4,99', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYa5yxOmKFjGDrlG4IYp9_B0JiBzf2hTE4A&s', promocao: 'Desconto de 20%' },
    { id: 9, nome: 'Alface Americana unidade', categoria: 'Hortifruti', preco: 'R$ 2,50', imagem: 'https://redemix.vteximg.com.br/arquivos/ids/210014-1000-1000/7898928744013.jpg?v=638350608985270000', promocao: 'Sem promoção' },
    { id: 10, nome: 'Banana Prata kg', categoria: 'Hortifruti', preco: 'R$ 6,00', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSPtfn172tiFbZmgasNiR7cryfyKzFTrUeQ&s', promocao: 'Desconto de 10%' },
    // Categoria: Higiene Pessoal
    { id: 6, nome: 'Sabonete Lux 90g', categoria: 'Higiene Pessoal', preco: 'R$ 2,99', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6uYeikGjxwofPQSubrSFGVG3zLBio478jZw&s', promocao: 'Desconto de 5%' },
    { id: 7, nome: 'Shampoo Seda Anti-resíduos 350ml', categoria: 'Higiene Pessoal', preco: 'R$ 9,90', imagem: 'https://m.media-amazon.com/images/I/41dDBsMS6DL.jpg', promocao: 'Desconto de 15%' },
    { id: 8, nome: 'Papel Higiênico Neve 12 Unidades', categoria: 'Higiene Pessoal', preco: 'R$ 14,99', imagem: 'https://redemix.vteximg.com.br/arquivos/ids/211454-1000-1000/7891172432019.jpg?v=638350613406800000', promocao: 'Desconto de 10%' },
    { id: 9, nome: 'Creme Dental Colgate 90g', categoria: 'Higiene Pessoal', preco: 'R$ 5,99', imagem: 'https://bretas.vtexassets.com/arquivos/ids/182889-800-auto?v=638375498714700000&width=800&height=auto&aspect=true', promocao: 'Sem promoção' },
    { id: 10, nome: 'Desodorante Rexona Aerosol 150ml', categoria: 'Higiene Pessoal', preco: 'R$ 9,50', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSl0Khb3wi0DAtsku91CPauwTnQwFJ3IP0JA&s', promocao: 'Desconto de 5%' },
  
    // Categoria: Limpeza
    { id: 11, nome: 'Água Sanitária Pinho Sol 1L', categoria: 'Limpeza', preco: 'R$ 3,99', imagem: 'https://m.media-amazon.com/images/S/aplus-media/vc/60a77200-0274-43c0-b05c-c572ec0d9226.__CR0,0,300,400_PT0_SX300_V1___.jpg', promocao: 'Desconto de 10%' },
    { id: 12, nome: 'Sabão em Pó Omo 1kg', categoria: 'Limpeza', preco: 'R$ 8,90', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2fgcfmJA0DyIUaiAXi10qRou6Opvnn1kbYA&s', promocao: 'Desconto de 15%' },
    { id: 13, nome: 'Detergente Ypê 500ml', categoria: 'Limpeza', preco: 'R$ 2,49', imagem: 'https://images.tcdn.com.br/img/img_prod/1028719/detergente_ype_500ml_637_1_3ad87948aa8eabe38f077fbdcaf191d9.png', promocao: 'Desconto de 20%' },
    { id: 14, nome: 'Limpador Multissuperfície Veja 500ml', categoria: 'Limpeza', preco: 'R$ 5,99', imagem: 'https://m.media-amazon.com/images/I/51NyPeB4MsL.jpg', promocao: 'Desconto de 10%' },
    { id: 15, nome: 'Amaciante Comfort 1L', categoria: 'Limpeza', preco: 'R$ 7,50', imagem: 'https://m.media-amazon.com/images/I/51EZK8JqBNL._AC_UF1000,1000_QL80_.jpg', promocao: 'Sem promoção' },
    { id: 16, nome: 'Desinfetante Pinho Bril 500ml', categoria: 'Limpeza', preco: 'R$ 4,00', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3LfpEsexK2TUbn2xR2xdEBx4JJoMzLjM9dw&s', promocao: 'Desconto de 5%' },
];
  
// Componente de Exibição de Produto
const ProductItem = ({ product, onAddToCart, onRemoveFromCart, cartQuantity }: { product: Produto; onAddToCart: (product: Produto) => void; onRemoveFromCart: (product: Produto) => void; cartQuantity: number }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: product.imagem }} style={styles.productImage} />
    <Text style={styles.productName}>{product.nome}</Text>
    <Text style={styles.productPrice}>{product.preco}</Text>
    <Text style={styles.productPromotion}>{product.promocao}</Text>
    <View style={styles.quantityControl}>
      <TouchableOpacity onPress={() => onRemoveFromCart(product)} disabled={cartQuantity <= 0}>
        <Text style={styles.quantityButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{cartQuantity}</Text>
      <TouchableOpacity onPress={() => onAddToCart(product)}>
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Componente de Exibição de Categoria
const CategoryItem = ({ category, onAddToCart, onRemoveFromCart, cart }: { category: string; onAddToCart: (product: Produto) => void; onRemoveFromCart: (product: Produto) => void; cart: Produto[] }) => {
  // Filtrando produtos por categoria
  const categoryProducts = produtos.filter(product => product.categoria === category);
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        horizontal
        data={categoryProducts}
        renderItem={({ item }) => {
          const quantity = cart.filter(product => product.id === item.id).length;
          return <ProductItem product={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cartQuantity={quantity} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Produto[]>([]);

  // Filtrando os produtos com base na pesquisa
  const filteredProducts = produtos.filter(product =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para adicionar produto ao carrinho
  const addToCart = (product: Produto) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Função para remover produto do carrinho
  const removeFromCart = (product: Produto) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Nome do Mercado */}
        <View style={styles.marketHeader}>
          <Text style={styles.marketName}>Mercado da Gente</Text>
          </View>
          <View style={styles.marketHeader}>
        <Text style={styles.marketDescription}>
        Seu mercado com produtos fresquinhos e promoções!
      </Text>
    </View>

        {/* Barra de Pesquisa */}
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar produtos"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Produtos Filtrados */}
        <Text style={styles.promotionsTitle}>Promoções</Text>
        <FlatList
          horizontal
          data={filteredProducts}
          renderItem={({ item }) => {
            const quantity = cart.filter(product => product.id === item.id).length;
            return <ProductItem product={item} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} cartQuantity={quantity} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        {/* Lista de Categorias de Produtos */}
        <Text style={styles.catalogTitle}>Catálogo de Produtos</Text>
        {['Mercearia', 'Bebidas', 'Carnes', 'Aves e Peixes', 'Hortifruti', 'Higiene Pessoal', 'Limpeza'].map((category) => (
          <CategoryItem key={category} category={category} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} cart={cart} />
        ))}

        {/* Informações de Contato */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Fale Conosco</Text>
          <Text>Telefone: (61) 3369-3207</Text>
          <Text>Endereço:  Q 22 Av Transversal Lj 23/24 - Paranoá, Brasília - DF, 70297-400</Text>
        </View>
      </ScrollView>

      {/* Carrinho de Compras */}
      <View style={styles.cartContainer}>
        <Text style={styles.cartText}>Carrinho: {cart.length} itens</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0059b3' // Fundo azul escuro
  },
  scrollContainer: {
    flex: 1,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  marketName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff', // Título "Mercado da Gente" em branco
  },
 marketDescription: { // Estiliza a frase abaixo do título do mercado
    fontSize: 16,
    color: '#ffffff', // Branco
    textAlign: 'center',
    marginTop: -8,
    paddingHorizontal: 5,
  },
  searchBar: {
    margin: 30,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  productItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: 160,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 16,
    color: '#007bff', // Azul para o preço do produto
  },
  productPromotion: {
    marginTop: 5,
    fontSize: 12,
    color: '#ff0000', // Vermelho para promoções
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    color: '#000000', // Azul para botões de quantidade
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#ffffff', // Branco para títulos de categorias
  },
  promotionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: '#ffffff', // Branco para o título "Promoções"
  },
  catalogTitle: { 
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    color: '#ffffff', // Branco para títulos do catálogo
  },
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#009900', // Botão do carrinho em vermelho
    alignItems: 'center',
  },
  cartText: {
    color: '#ffffff', // Texto do botão em branco
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});


export default App;

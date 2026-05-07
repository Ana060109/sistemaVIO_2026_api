-- trigger para impedir alteração de evento passado

delimiter //
create trigger impedir_alteracao_evento_passado
before update on evento
for each row
begin
    if old.data_hora < curdate() then
        signal sqlstate "45000"
        set message_text = "Não é permitido alterar eventos que já ocorreram!";
    end if;
end; //

delimiter ;



delimiter $$
create trigger trg_after_delete_compra
after delete on compra
for each row
begin
    insert into historico_compra(id_compra, data_compra, fk_cpf) values
    (old.id_compra, old.data_compra, old.fk_cpf);
end; $$
delimiter ;


delimiter $$ 

create trigger trg_insert_itens_pedido
before insert on itens_pedido
for each row
begin 
    declare v_preco decimal(10,2);
    declare v_estoque int;

    -- buscar preço e estoque do produto
    select preco, estoque
    into v_preco, v_estoque 
    from produtos
    where id_produto = new.id_produto;

    -- verificar se existe suficiente
    if new.quantidade > v_estoque then
        signal sqlstate '45000'
        set message_text = "Estoque insuficiente!";
    end if;

    -- preencher o preco_unitario automaticamente
    set new.preco_unitario = v_preco;

    -- calcular o subtotal automaticamente
    set new.subtotal = new.quantidade * new.preco_unitario;

end; $$

delimiter ;